import {useBlockStore} from "../../hooks/useBlockHooks";
import {editorSelection} from "../../../../App";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";
import {useIndexList} from "../../context/NoteIndexListProvider";

function useListHandler() {
    const blockStore = useBlockStore();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const {getOrder} = useIndexList();

    const changeDepth = () => {
        const blockId = editorSelection.startBlockId;
        const block = blockStore.getBlock(blockId);

        if (editorSelection.isCaret() && block.type === "ol" || block.type === "ul") {
            // 첫 목록 안되게 하기
            const order = getOrder(blockId);
            if (order === 0) return;

            // 최대 Depth 를 넘은 경우
            if (block.depth >= 3) return;

            // TODO: 부모 depth 보다 크게 안됨

            // TODO: Child 로 옮겨줌


            block.depth += 1;
            setReRenderTargetId(blockId);
        }
    };

    return {changeDepth}
}

export default useListHandler;