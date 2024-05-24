import React, {createContext, useRef, useState} from 'react';
import NoteEditor from "../editor/NoteEditor";

const testNote = {
    type: "docs",
    id: "1",
    contents: [
        "block-abcs-123a-2sf1",
        "block-fi12-123a-2sf1",
    ]
}

const testBlockStore = {
    "block-abcs-123a-2sf1": {
        id : "block-abcs-123a-2sf1",
        type: "text",
        contents: []
    },
    "block-fi12-123a-2sf1": {
        id : "block-fi12-123a-2sf1",
        type: "table",
        contents: [
            "sdf","asdf",
        ]
    }
}

export const BlockStoreContext = createContext(null);

function NoteEditorContainer(props) {
    const [noteData, setNoteData] = useState(testNote);
    const {current: blockStore} = useRef(testBlockStore);
    return (
        <BlockStoreContext.Provider value={blockStore}>
            <NoteEditor note={noteData} setNote={setNoteData}/>
        </BlockStoreContext.Provider>
    );
}

export default React.memo(NoteEditorContainer);