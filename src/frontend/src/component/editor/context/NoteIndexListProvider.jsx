import React, {createContext, useContext, useEffect, useState} from 'react';
import useBlockIdList from "../hooks/useBlockIdList";
import {useBlockStore} from "../hooks/useBlockHooks";

const NoteIndexListContext = createContext(null);

export function NoteIndexListProvider({children}) {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const [indexList, setIndexList] = useState([]);

    useEffect(() => {
        let index = 0;
        const indexList = blockIdList.map((item, idx) => {
            if (idx === 0) return index;
            if (blockStore.getBlockType(item) === blockStore.getBlockType(blockIdList[idx - 1])) {
                return ++index;
            } else {
                index = 0;
                return index;
            }
        })
        console.log(indexList);
        setIndexList(indexList);
    }, [blockIdList]);


    return (
        <NoteIndexListContext.Provider value={indexList}>
            {children}
        </NoteIndexListContext.Provider>
    );
}

export function useIndexList() {
    const {getIndexOfBlock} = useBlockIdList();
    const indexList = useContext(NoteIndexListContext);

    const getOrder = (blockId) => {
        const blockIndex = getIndexOfBlock(blockId);

        return indexList[blockIndex];
    }

    return {getOrder}
}

