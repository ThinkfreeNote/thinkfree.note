import {useBlockStore} from "../../hooks/useBlockHooks";
import {editorSelection} from "../../../../App";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";
import {useIndexList} from "../../context/NoteIndexListProvider";
import useBlockIdList from "../../hooks/useBlockIdList";

function useListHandler() {
    const note = useBlockIdList();
    const blockStore = useBlockStore();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const {getOrder} = useIndexList();
    const {getPrevBlockId, deleteBlock} = useBlockIdList();


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

    const isFirstList = (curBlock) => {
        let isFirstList;
        // 첫 목록인지 검사
        if (curBlock.depth === 0) {
            const index = getOrder(curBlock.id)
            return isFirstList = index === 0;
        } else {
            return isFirstList = blockStore.getBlock(curBlock.parentId).getChildIndex(curBlock.id) === 0;
        }
    }

    return {increaseDepth, isFirstList};
}

export default useListHandler;