import {useBlockStore} from "../../hooks/useBlockHooks";
import {editorSelection} from "../../../../App";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";
import {useIndexList} from "../../context/NoteIndexListProvider";
import useBlockIdList from "../../hooks/useBlockIdList";
import useNote from "../../hooks/useNote";

function useListHandler() {
    const note = useBlockIdList();
    const blockStore = useBlockStore();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const {getOrder} = useIndexList();
    const {getPrevBlockId, deleteBlock} = useBlockIdList();


    const changeDepth = () => {
        const curBlockId = editorSelection.startBlockId;
        const curBlock = blockStore.getBlock(curBlockId);

        // 예외 처리: 최대 Depth를 넘은 경우
        if (curBlock.depth >= 3) return;

        // depth가 0일 때 블록을 이전 블록의 자식으로 이동 후, note에서 제거
        if (curBlock.depth === 0) {
            // 예외 처리: 첫 목록인경우
            const order = getOrder(curBlockId);
            const prevBlock = blockStore.getBlock(getPrevBlockId(curBlockId));
            if (order === 0) return;

            curBlock.depth += 1;
            curBlock.parentId = prevBlock.id;
            prevBlock.childIdList.push(curBlockId);
            curBlock.childIdList.forEach((childId) => {
                prevBlock.childIdList.push(childId);
                note.deleteBlock(childId);
            });
            note.deleteBlock(curBlockId);

            return;
        }

        // 예외 처리: 자식의 첫 목록인 경우

        const parentBlock = blockStore.getBlock(curBlock.parentId);
        const prevBlock = blockStore.getBlock(parentBlock.getPrevChildBlockId(curBlockId));
        curBlock.depth += 1;
        parentBlock.childIdList.splice(parentBlock.getChildIndex(curBlockId), 1);
        prevBlock.childIdList.push(curBlockId);

        setReRenderTargetId(parentBlock.id);
    };

    return {changeDepth};
}

export default useListHandler;