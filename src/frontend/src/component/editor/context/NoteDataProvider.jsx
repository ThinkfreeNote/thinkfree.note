import React, {createContext, useEffect, useRef, useState} from 'react';
import {FontStyle} from "../../../model/FontStyle";
import {TextBlock} from "../../../model/TextBlock";
import {BlockStore} from "../../../model/BlockStore";
import {Text} from "../../../model/Text";
import {Table} from "../../../model/Table";


export const BlockStoreContext = createContext(null);
export const BlockIdListContext = createContext(null);

/**
 * @desc noteContents, blockStore 관리
 * @param noteId
 * @param children
 * @returns {JSX.Element}
 */
function NoteDataProvider({children,noteId}) {
    const [blockIdList, setBlockIdList] = useState([]);
    const blockStore = useRef(null);

    useEffect(() => {
        // noteId 없으면 새 노트
        if(!noteId) {
            blockStore.current = new BlockStore();
            const firstBlock = blockStore.current.createBlock("text");
            setBlockIdList([firstBlock.id]);
        }
        // noteId 있을 때는 데이터 불러와서 파싱
        else {
            fetch(`http://localhost:8080/documents/${noteId}`)
                .then(res => res.json())
                .then(data => {
                    const parsedData = JSON.parse(data.content, (key,value) => {
                        if(value.type === "table") return Object.setPrototypeOf(value, Table.prototype);
                        if(value.type === "text") return Object.setPrototypeOf(value,TextBlock.prototype);
                        if(Object.hasOwn(value,"fontSize")) return Object.setPrototypeOf(value,FontStyle.prototype);
                        if(Object.hasOwn(value,"fontStyle")) return Object.setPrototypeOf(value,Text.prototype);
                        if(key === "blocks") return Object.setPrototypeOf(value,BlockStore.prototype);
                        return value;
                    })
                    blockStore.current = parsedData.blocks;
                    setBlockIdList([...parsedData.blockIdList]);
                })
        }
    }, []);

    if(blockIdList.length === 0) return null;

    return (
        <BlockIdListContext.Provider value={{blockIdList, setBlockIdList}}>
            <BlockStoreContext.Provider value={blockStore}>
                {children}
            </BlockStoreContext.Provider>
        </BlockIdListContext.Provider>
    );
}

export default NoteDataProvider;