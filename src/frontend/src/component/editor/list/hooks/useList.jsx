import {useBlockStore} from "../../hooks/useBlockHooks";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";

function useList() {
    const blockStore = useBlockStore();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);

    const toggleCheckBox = (e) => {
        const blockId = e.target.closest("[data-block-id]").dataset.blockId;
        const block = blockStore.getBlock(blockId);

        block.isChecked = !block.isChecked;

        setReRenderTargetId(blockId);
    }


    return {toggleCheckBox};
}

export default useList;