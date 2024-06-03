import React, {createContext, useRef, useState} from 'react';
import {BlockStore} from "../../../model/BlockStore";
import {Note} from "../../../model/Note";
import {FontStyle} from "../../../model/FontStyle";
import {Text} from "../../../model/Text";
import {TextBlock} from "../../../model/TextBlock";
import {getRandomId} from "../../../utils/id";
import {Table} from "../../../model/Table";

const testBlockStore = new BlockStore();
const note = new Note();

const createTest = () => {
    // 노트
    const blockId1 = "abcs-123a-2sf1";
    note.addBlockId(blockId1);
    // 폰트 스타일
    const fontStyle1 = new FontStyle(
        "red",
        "30px",
        "Noto Sans KR",
        "bold", "italic",
        ["underline", "line-through"]
    );
    // 텍스트
    const text1 = new Text(blockId1, "테스트입니다~~~", fontStyle1);
    // 텍스트 블럭
    const textBlock1 = new TextBlock(blockId1, "text", []);
    textBlock1.addText(text1);

    // 블럭 스토어
    testBlockStore.addBlock(textBlock1);

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
 * @param children
 * @returns {JSX.Element}
 */
function BlockIdListProvider({children}) {
    const [blockIdList, setBlockIdList] = useState(note.blockIdList);
    const {current: blockStore} = useRef(testBlockStore);

    return (
        <BlockIdListContext.Provider value={{blockIdList, setBlockIdList}}>
            <BlockStoreContext.Provider value={blockStore}>
                {children}
            </BlockStoreContext.Provider>
        </BlockIdListContext.Provider>
    );
}

export default BlockIdListProvider;