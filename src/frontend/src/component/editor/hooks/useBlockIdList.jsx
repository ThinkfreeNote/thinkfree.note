import {useContext} from 'react';
import {BlockIdListContext} from "../context/BlockIdListProvider";

/**
 * @desc noteContents 관리 훅
 * @desc noteContents 를 조작하는 메서드들을 이 커스텀 훅 내에 작성
 * @todo noteContents 이름이 가독성이 좋지 않아서 변경해야 하지 않을까 하는 생각
 * @returns {{addBlockId : function, noteContents, setNoteContents, getIndexOfBlock: function}}
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

    return {
        blockIdList, addBlockId, getIndexOfBlock
    }
}

export default useBlockIdList;