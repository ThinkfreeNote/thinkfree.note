import React, {createContext, useRef, useState} from 'react';
import NoteEditor from "../editor/NoteEditor";
import {Table} from "../../model/Table";

const testNote = [
    "abcs-123a-2sf1",
    "fi12-test-2sf1",
];

const testBlockStore = {
    "abcs-123a-2sf1": {
        id: "abcs-123a-2sf1",
        type: "text",
        contents: ["s1234"]
    },
    "fi12-test-2sf1": new Table("fi12-test-2sf1"),
}

export const BlockStoreContext = createContext(null);

function NoteEditorContainer(props) {
    const [noteContents, setNoteContents] = useState(testNote);
    const {current: blockStore} = useRef(testBlockStore);
    return (
        <BlockStoreContext.Provider value={blockStore}>
            <NoteEditor noteContents={noteContents} setNoteContents={setNoteContents}/>
        </BlockStoreContext.Provider>
    );
}

export default React.memo(NoteEditorContainer);