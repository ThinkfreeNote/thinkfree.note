import React, {createContext, useEffect, useRef, useState} from 'react';
import {Note} from "../../model/note";
import {Block} from "../../model/block";
import {getRandomId} from "../../utils/id";
import NoteEditor from "../editor/NoteEditor";

export const BlockStoreContext = createContext(null);

function NoteEditorContainer(props) {
    const [noteData, setNoteData] = useState(new Note());
    const {current: blockStore} = useRef({});

    useEffect(() => {
        // 개발 테스트용 데이터
        if (process.env.NODE_ENV === "development" && Object.keys(blockStore).length < 2) {
            const testId = "block-" + getRandomId();
            blockStore[testId] = new Block(testId);
            // 테스트용 수정
            if(Object.keys(blockStore).length === 1) {
                blockStore[testId].type = "text";
            }
            else {
                blockStore[testId].type = "table";
            }
            setNoteData({
                ...noteData,
                contents: noteData.contents.concat([testId]),
            })
            console.log(noteData.contents);
        }
    }, [blockStore, noteData]);

    return (
        <BlockStoreContext.Provider value={blockStore}>
            <NoteEditor note={noteData} setNote={setNoteData}/>
        </BlockStoreContext.Provider>
    );
}

export default React.memo(NoteEditorContainer);