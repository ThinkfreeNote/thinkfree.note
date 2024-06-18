import {useBlockStore} from "../../hooks/useBlockHooks";
import {editorSelection} from "../../../../App";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";

function useListHandler() {
    const blockStore = useBlockStore();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);

    const changeDepth = () => {
        const blockId = editorSelection.startBlockId;
        const block = blockStore.getBlock(blockId);

        if (editorSelection.isCaret() && block.type === "ol" || block.type === "ul") {
            // 최대 Depth 를 넘은 경우
            if (block.depth >= 3) return;

            // TODO: 부모 depth 보다 크게 안됨


            block.depth += 1;
            console.log(blockId);
            setReRenderTargetId(blockId);
        }
    };

    return {changeDepth}
}

export default useListHandler;