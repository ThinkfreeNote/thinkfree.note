import {useBlockStore} from "../../hooks/useBlockHooks";
import {editorSelection} from "../../../../App";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";
import {useIndexList} from "../../context/NoteIndexListProvider";
import useBlockIdList from "../../hooks/useBlockIdList";

function useListHandler() {
    const blockStore = useBlockStore();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const {getOrder} = useIndexList();
    const {getPrevBlockId, deleteBlock} = useBlockIdList();


    const changeDepth = () => {
        const blockId = editorSelection.startBlockId;
        const block = blockStore.getBlock(blockId);

        if (editorSelection.isCaret() && block.type === "ol" || block.type === "ul") {
            // 첫 목록인 경우 예외 처리
            const order = getOrder(blockId);
            if (order === 0) return;

            // 최대 Depth 를 넘은 경우 예외 처리
            if (block.depth >= 3) return;

            // 자식은 부모 기준 1 depth 를 넘을 수 없음
            const prevBlock = blockStore.getBlock(getPrevBlockId(blockId));
            if (block.depth > prevBlock.depth) {
                return;
            }

            // blockId 를 이전 ListBlock 의 childIdList 에 추가, 이후 기존 ListBlockId 삭제
            prevBlock.moveChild(block.id);
            console.log(prevBlock);
            console.log(deleteBlock(blockId));

            block.depth += 1;
            setReRenderTargetId(blockId);
        }
    };

    return {changeDepth}
}

export default useListHandler;