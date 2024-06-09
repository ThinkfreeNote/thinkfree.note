import React, {createContext, useEffect, useRef, useState} from 'react';
import {FontStyle} from "../../../model/FontStyle";
import {TextBlock} from "../../../model/TextBlock";
import {BlockStore} from "../../../model/BlockStore";
import {Note} from "../../../model/Note";
import {Text} from "../../../model/Text";
import {getRandomId} from "../../../utils/id";
import {Table} from "../../../model/Table";


const testBlockStore = new BlockStore();
const note = new Note();

const createTest = () => {
    // 노트
    const blockId1 = "3840-4d93-b06d";
    const blockId3 = "4840-4d93-b062";
    note.addBlockId(blockId1);
    note.addBlockId(blockId3);

    // 폰트 스타일
    const fontStyle1 = new FontStyle(
        "red",
        "20px",
        "Noto Sans KR",
        "bold", "italic",
        "underline"
    );
    const fontStyle2 = new FontStyle(
        "blue",
        "20px",
        "Noto Sans KR",
        "underline"
    );

    // 텍스트
    const text1 = new Text(getRandomId(), "테스트입니다1", fontStyle1);
    const text2 = new Text(getRandomId(), "테스트입니다2", fontStyle2);
    const text3 = new Text(getRandomId(), "테스트입니다3", fontStyle1);
    const text4 = new Text(getRandomId(), "테스트입니다4", fontStyle2);
    const text5 = new Text(getRandomId(), "테스트입니다5", fontStyle1);
    const text6 = new Text(getRandomId(), "테스트입니다6", fontStyle2);

    // 텍스트 블럭
    const textBlock1 = new TextBlock(blockId1, "text", {});
    textBlock1.addText(text1);
    textBlock1.addText(text2);

    const textBlock2 = new TextBlock(blockId3, "text", {});
    textBlock2.addText(text3);
    textBlock2.addText(text4);
    textBlock2.addText(text5);
    textBlock2.addText(text6);

    // 블럭 스토어
    testBlockStore.addBlock(textBlock1);
    testBlockStore.addBlock(textBlock2);

    const blockId2 = getRandomId();
    note.addBlockId(blockId2);
    testBlockStore.addBlock(new Table(blockId2));

    return testBlockStore;
}
// note와 blockStore 생성하여 테스트 데이터를 넣어줌
createTest();

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
                        if(Object.hasOwn(value,"fontStyle")) return Object.setPrototypeOf(value,TextBlock.prototype);
                        if(key === "blocks") return Object.setPrototypeOf(value,BlockStore.prototype);
                        return value;
                    })
                    blockStore.current = parsedData.blocks;
                    setBlockIdList([...parsedData.blockIdList]);
                    console.log(parsedData);
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