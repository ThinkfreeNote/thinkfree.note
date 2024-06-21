import {editorSelection} from "../../../App";
import {Text} from "../../../model/Text";
import {getRandomId} from "../../../utils/id";
import {FontStyle} from "../../../model/FontStyle";
import useBlockIdList from "./useBlockIdList";
import {useContext} from "react";
import {MenuContext} from "../../common/MenuContext";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {useBlockStore} from "./useBlockHooks";
import {useSelectionManager} from "../../context/SelectionManagerProvider";
import {EditorSelection} from "../../../model/Selection";
import {useIndexList} from "../context/NoteIndexListProvider";
import useListHandler from "../list/hooks/useListHandler";

/**
 * @desc blockIdList, blockStore 둘 다 조작하는 함수들 관리
 */
function useNote() {
    const {blockIdList, getPrevBlockId, reloadBlockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const note = useBlockIdList();
    const {offset} = useContext(MenuContext);
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const selectionManager = useSelectionManager();
    const {isFirstList} = useListHandler();
    /**
     * @desc 블록을 삭제하는 함수
     */
    const backspaceRemoveBlock = () => {
        if (editorSelection.blockId[0] === blockIdList[0]) return;

        const blockId = editorSelection.startBlockId;
        const prevBlockId = getPrevBlockId(blockId);
        const prevBlock = blockStore.getBlock(prevBlockId);

        let blockOffset = prevBlock.getLastTextId();
        let offset = EditorSelection.LAST_OFFSET;

        // 블록이 비어있지 않은 경우 현재 블록과 이전 블록을 합쳐주는 작업 수행
        if (!editorSelection.isEmptyBlock()) {
            blockStore.compositeBlock(blockId, prevBlockId);
            setReRenderTargetId(prevBlockId);

            // 합쳐지면서 합치기 전 블록의 text 객체가 없어졌다면
            if (prevBlock.textIdList.indexOf(blockOffset) === -1) {
                // 합쳐진 블록의 첫번째로 blockOffset 변경
                blockOffset = prevBlock.getFirstTextId();
                offset = EditorSelection.FRONT_OFFSET;
            }
        }
        note.deleteBlock(blockId);

        // 커서 이동
        selectionManager.setEditorCaretPosition(prevBlockId, blockOffset, offset, "text");
    }

    const appendBlockAfterCurrentBlock = (e) => {
        e.preventDefault();

        // 메뉴가 열려있으면 동작 x
        if (offset.x !== 0 && offset.y !== 0) return;

        const block = blockStore.getBlock(editorSelection.startBlockId);
        const text = block.getTextFromId(editorSelection.getClosestId("text").start);
        let textIdx = block.getTextIdx(text.id);
        let newBlockType = block.type;

        // 분리하고 업데이트된 textIdx 구함
        const dividedTextContents = editorSelection.getDividedTextContentsFromCaret();
        const cnt = block.divideText(textIdx, dividedTextContents.before, dividedTextContents.after);

        // text 마지막에 캐럿이 잡힐 경우 예외 처리
        if (dividedTextContents.after === "") textIdx++;

        // 추가된만큼 idx 증가
        textIdx += cnt;

        // 기존 textBlock에 있는 text들 삭제
        const removedTextList = [];
        while (true) {
            const text = block.removeText(textIdx);
            if (!text) break;
            removedTextList.push(text);
        }
        if (block.textIdList.length === 0) {
            block.addText(new Text(getRandomId(), "", new FontStyle()));
        }

        // 새로운 Text들을 담은 TextBlock을 추가 (이전과 같은 타입의 텍스트 블럭을 생성)
        const newBlock = blockStore.createNewBlock(newBlockType, removedTextList);
        note.addBlockId(newBlock.id, note.getIndexOfBlock(block.id) + 1);
        // 기존 TextBlock 리렌더링
        setReRenderTargetId(block.id);
    }

    const appendBlockAfterCurrentListBlock = (e) => {
        e.preventDefault();
        // 메뉴가 열려있으면 동작 x
        if (offset.x !== 0 && offset.y !== 0) return;

        const curBlock = blockStore.getBlock(editorSelection.startBlockId);
        const text = curBlock.getTextFromId(editorSelection.getClosestId("text").start);
        let textIdx = curBlock.getTextIdx(text.id);
        let newBlockType = curBlock.type;

        // textValue 가 없고, depth 가 0일 때만 TextBlock 추가
        if (text.value === "" && curBlock.textIdList.length === 1 && curBlock.depth === 0) {
            curBlock.type = "text";// TODO: type만 text로 바꿔준거라 문제 생길 수도 있음
            newBlockType = "text";
        }

        // 분리하고 업데이트된 textIdx 구함
        const dividedTextContents = editorSelection.getDividedTextContentsFromCaret();
        const cnt = curBlock.divideText(textIdx, dividedTextContents.before, dividedTextContents.after);

        // text 마지막에 캐럿이 잡힐 경우 예외 처리
        if (dividedTextContents.after === "") textIdx++;

        // 추가된만큼 idx 증가
        textIdx += cnt;

        // 기존 textBlock에 있는 text들 삭제
        const removedTextList = [];
        while (true) {
            const text = curBlock.removeText(textIdx);
            if (!text) break;
            removedTextList.push(text);
        }
        if (curBlock.textIdList.length === 0) {
            curBlock.addText(new Text(getRandomId(), "", new FontStyle()));
        }

        // BlockStore 에 새로운 Text 들을 담은 ListBlock 추가 (이전과 같은 타입의 블럭을 생성)
        const newBlock = blockStore.createNewBlock(newBlockType, removedTextList);

        if (curBlock.depth === 0) {
            // 자식이 없는 경우
            if (curBlock.childIdList.length === 0) {
                note.addBlockId(newBlock.id, note.getIndexOfBlock(curBlock.id) + 1);
                // 기존 block 리렌더링
                setReRenderTargetId(curBlock.id);
            }
            // 자식이 있는 경우
            else {
                // 새로운 블럭의 정보를 넣어줌
                newBlock.depth = curBlock.depth + 1;
                newBlock.parentId = curBlock.id;

                // 새로운 블럭은 자신의 첫 자식으로 들어감
                curBlock.childIdList.unshift(newBlock.id);

                // 리렌더링
                setReRenderTargetId(curBlock.id);
                reloadBlockIdList();
            }
        }
        else if (curBlock.depth > 0) {
            // 자식이 없는 경우
            if (curBlock.childIdList.length === 0) {
                const parentBlock = blockStore.getBlock(curBlock.parentId);

                // 새로운 블럭의 정보를 넣어줌
                newBlock.depth = curBlock.depth;
                newBlock.parentId = curBlock.parentId;

                // 새로운 블럭은 부모의 마지막 자식으로 들어감
                parentBlock.childIdList.splice(parentBlock.childIdList.indexOf(curBlock.id) + 1, 0, newBlock.id);

                // 리렌더링
                setReRenderTargetId(parentBlock.id);
                reloadBlockIdList();
            }
            // 자식이 있는 경우
            else {
                // 새로운 블럭의 정보를 넣어줌
                newBlock.depth = curBlock.depth + 1;
                newBlock.parentId = curBlock.id;

                // 새로운 블럭은 자신의 첫 자식으로 들어감
                curBlock.childIdList.unshift(newBlock.id);

                // 리렌더링
                setReRenderTargetId(curBlock.id);
                reloadBlockIdList();
            }
        }
    }

    return {backspaceRemoveBlock, appendBlockAfterCurrentBlock, appendBlockAfterCurrentListBlock}
}

export default useNote;