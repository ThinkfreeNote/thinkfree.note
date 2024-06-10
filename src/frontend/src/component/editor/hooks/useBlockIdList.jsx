import {useContext} from 'react';
import {BlockIdListContext} from "../context/NoteDataProvider";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import tableToolBox from "../table/TableToolBox";

/**
 * @desc BlockIdList 관리 훅
 */
function useBlockIdList() {
    const {blockIdList, setBlockIdList} = useContext(BlockIdListContext);

    /**
     * @desc blockIdList 에 블록 id 추가
     * @param {String} blockId
     * @param {number} offset offset 미입력 시 가장 마지막에 추가
     */
    const addBlockId = (blockId, offset = Infinity) => {
        const index = offset > blockIdList.length ? blockIdList.length : offset;
        const newNoteContents = [...blockIdList];
        newNoteContents.splice(index, 0, blockId);
        setBlockIdList(newNoteContents);
    }

    const getIndexOfBlock = (blockId) => {
        return blockIdList.indexOf(blockId);
    }

    /**
     * @param blockId
     * @returns {boolean} 삭제 성공 실패 여부
     */
    const deleteBlock = (blockId) => {
        const index = getIndexOfBlock(blockId);
        if (index === -1 || blockIdList.length === 1) return false;

        const newBlockIdList = [...blockIdList];
        newBlockIdList.splice(index, 1);
        setBlockIdList(newBlockIdList);

        return true;
    }

    const replaceBlock = (originBlockId, newBlockId) => {
        const index = getIndexOfBlock(originBlockId);
        const newBlockIdList = [...blockIdList];
        newBlockIdList.splice(index, 1, newBlockId);
        setBlockIdList(newBlockIdList);
    }

    return {
        blockIdList, addBlockId, getIndexOfBlock, deleteBlock, replaceBlock
    }
}

export default useBlockIdList;