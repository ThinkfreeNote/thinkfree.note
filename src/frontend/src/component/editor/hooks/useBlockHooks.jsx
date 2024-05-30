import {useContext} from 'react';
import {BlockStoreContext} from "../../container/NoteEditorContainer";

/**
 * @desc blockId를 받아 블럭스토어에서 블럭 데이터를 가져오는 커스텀 훅
 * @warning BlockStoreContext.Provider 내부에서만 사용 할 것
 * @param {String} blockId 가져올 블록 아이디 
 * @returns {TextBlock} blockData
 */
export function useBlockData(blockId) {
    const blockStore = useContext(BlockStoreContext);

    return (blockStore[blockId]);
}

/**
 * @desc blockStore 가져오는 커스텀 훅
 * @warning BlockStoreContext.Provider 내부에서만 사용 할 것
 * @returns {BlockStore} blockStore
 */
export function useBlockStore() {
    const blockStore = useContext(BlockStoreContext);

    return (blockStore);
}
