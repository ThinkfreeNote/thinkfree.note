import {useBlockStore} from "../../hooks/useBlockHooks";
import {editorSelection} from "../../../../App";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";
import {useIndexList} from "../../context/NoteIndexListProvider";
import useBlockIdList from "../../hooks/useBlockIdList";
import {useSelectionManager} from "../../../context/SelectionManagerProvider";
import {EditorSelection} from "../../../../model/Selection";

function useListHandler() {
    const note = useBlockIdList();
    const blockStore = useBlockStore();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const {setEditorCaretPosition} = useSelectionManager();
    const {getOrder} = useIndexList();
    const {getPrevBlockId} = useBlockIdList();

    const increaseDepth = () => {
        const curBlockId = editorSelection.startBlockId;
        const curBlock = blockStore.getBlock(curBlockId);

        // 예외 처리: 최대 Depth를 넘은 경우
        if (curBlock.depth >= 2) return;

        // depth가 0일 때 블록을 이전 블록의 자식으로 이동 후, note에서 제거
        if (curBlock.depth === 0) {
            // 예외 처리: 첫 목록인경우
            const order = getOrder(curBlockId);
            const prevBlock = blockStore.getBlock(getPrevBlockId(curBlockId));
            if (order === 0) return;

            // depth 와 parentId 변경
            curBlock.depth += 1;
            curBlock.parentId = prevBlock.id;

            // 이전 Block 의 자식으로 이동
            prevBlock.childIdList.push(curBlockId);

            // 원래 자식들도 이전 Block 의 자식으로 이동
            curBlock.childIdList.forEach((childId) => {
                prevBlock.childIdList.push(childId);
            });
            curBlock.childIdList = [];

            note.deleteBlock(curBlockId);
            setReRenderTargetId(prevBlock.id);
            setEditorCaretPosition(prevBlock.id,editorSelection.startBlockOffset,editorSelection.startOffset,"text");
        } else if (curBlock.depth === 1) {
            const parentBlock = blockStore.getBlock(curBlock.parentId);
            const prevBlock = blockStore.getBlock(parentBlock.getPrevChildBlockId(curBlockId));

            // 예외 처리: 자식의 첫 목록인 경우
            if (parentBlock.childIdList.indexOf(curBlockId) === 0)  return;

            // depth 와 parentId 변경
            curBlock.depth += 1;
            curBlock.parentId = prevBlock.id;

            // 부모의 childIdList 에서 제거
            parentBlock.childIdList.splice(parentBlock.getChildIndex(curBlockId), 1);

            // 이전 Block 의 자식으로 이동
            prevBlock.childIdList.push(curBlockId);

            // 원래 자식들도 이전 Block 의 자식으로 이동
            curBlock.childIdList.forEach((childId) => {
                prevBlock.childIdList.push(childId);
            });
            curBlock.childIdList = [];

            setReRenderTargetId(parentBlock.id);
        }
    };

    const addListBlock = (curBlock, newBlock) => {
        editorSelection.removeSelection();
        let reRenderTargetId = null;
        if (curBlock.depth === 0) {
            // 자식이 없는 경우
            if (curBlock.childIdList.length === 0) {
                note.addBlockId(newBlock.id, note.getIndexOfBlock(curBlock.id) + 1);
                // 기존 block 리렌더링
                reRenderTargetId = curBlock.id;
            }
            // 자식이 있는 경우
            else {
                // 새로운 블럭의 정보를 넣어줌
                newBlock.depth = curBlock.depth + 1;
                newBlock.parentId = curBlock.id;

                // 새로운 블럭은 자신의 첫 자식으로 들어감
                curBlock.childIdList.unshift(newBlock.id);

                reRenderTargetId = curBlock.id;
            }
        } else if (curBlock.depth > 0) {
            // 자식이 없는 경우
            if (curBlock.childIdList.length === 0) {
                const parentBlock = blockStore.getBlock(curBlock.parentId);

                // 새로운 블럭의 정보를 넣어줌
                newBlock.depth = curBlock.depth;
                newBlock.parentId = curBlock.parentId;

                // 새로운 블럭은 부모의 마지막 자식으로 들어감
                parentBlock.childIdList.splice(parentBlock.childIdList.indexOf(curBlock.id) + 1, 0, newBlock.id);

                reRenderTargetId = parentBlock.id;
            }
            // 자식이 있는 경우
            else {
                // 새로운 블럭의 정보를 넣어줌
                newBlock.depth = curBlock.depth + 1;
                newBlock.parentId = curBlock.id;

                // 새로운 블럭은 자신의 첫 자식으로 들어감
                curBlock.childIdList.unshift(newBlock.id);

                reRenderTargetId = curBlock.id;
            }
        }
        setReRenderTargetId(reRenderTargetId);
        setEditorCaretPosition(reRenderTargetId,newBlock.getFirstTextId(),EditorSelection.FRONT_OFFSET,"text");
    }

    /**
     * 자식, 손주의 depth 초기화
     * @param curBlock
     * @returns {*[]}
     */
    function resetChildBlockDepth(curBlock) {
        const zeroDepthBlockIdList = [];

        // 자식들을 0 depth 로
        curBlock.childIdList.forEach((childId) => {
            const childBlock = blockStore.getBlock(childId);

            childBlock.depth = 0;
            childBlock.parentId = "";
            zeroDepthBlockIdList.push(childBlock.id);

            // 손자들의 depth 를 1 로
            childBlock.childIdList.forEach((grandChildId) => {
                const grandChildBlock = blockStore.getBlock(grandChildId);
                grandChildBlock.depth = 1;
            });
        });

        return zeroDepthBlockIdList;
    }

    /**
     * 리스트 css value 를 반환
     */
    const getListCssValue = (type, index, depth, isChecked) => {
        // 체크 리스트인 경우
        if (type === "cl") {
            return isChecked ? "✅" : "❎";
        }

        // 인덱스가 넘어가면 초기화
        const maxIndex = 26;
        // 0이면 maxIndex 반환
        const changedIndex = index % maxIndex || maxIndex; // 1-based index

        switch (depth) {
            case 0:
                return index;
            case 1:
                return String.fromCharCode(64 + changedIndex); // 65 is 'A'
            case 2:
                return String.fromCharCode(96 + changedIndex); // 97 is 'a'
            default:
                return index;
        }
    }

    return {increaseDepth, addListBlock, resetChildBlockDepth, getListCssValue};
}

export default useListHandler;