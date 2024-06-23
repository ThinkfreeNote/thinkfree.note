import {useBlockStore} from "../../hooks/useBlockHooks";
import {editorSelection} from "../../../../App";
import {useContext} from "react";
import {BlockReRenderContext} from "../../context/BlockReRenderContext";
import {useIndexList} from "../../context/NoteIndexListProvider";
import useBlockIdList from "../../hooks/useBlockIdList";

function useHeadHandler() {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();

    const getHeadBlockIdList = () => {
        const headBlockIdList = [];
        blockIdList.forEach((blockId) => {
            if (blockStore.getBlockType(blockId) === "head") {
                headBlockIdList.push(blockId)
            }
        })
        return headBlockIdList;
    };

    return {getHeadBlockIdList};
}

export default useHeadHandler;