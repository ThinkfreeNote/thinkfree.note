import {useContext} from 'react';
import {BlockIdListContext} from "../context/NoteDataProvider";

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

    const getPrevBlockId = (blockId) => {
        const index = getIndexOfBlock(blockId);

        return index < 1 ? blockId : blockIdList[index - 1];
    }

    /**
     * @desc blockId 위치 변경
     * @param blockId 옮길 블록 아이디
     * @param offset 블록 아이디를 옮길 위치
     */
    const moveBlock = (blockId, offset) => {
        const newBlockIdList = [...blockIdList];
        const currentIdx = getIndexOfBlock(blockId);
        const targetBlockId = newBlockIdList[offset];
        newBlockIdList.splice(currentIdx, 1);

        const index = newBlockIdList.indexOf(targetBlockId);
        newBlockIdList.splice(index + 1, 0, blockId);

        setBlockIdList(newBlockIdList);
    }

    return {
        blockIdList, addBlockId, getIndexOfBlock, deleteBlock, replaceBlock, getPrevBlockId, moveBlock
    }
}

export default useBlockIdList;