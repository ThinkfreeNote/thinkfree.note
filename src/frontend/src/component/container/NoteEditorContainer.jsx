import React, {createContext, useRef, useState} from 'react';
import NoteEditor from "../editor/NoteEditor";

const testNote = [
    "abcs-123a-2sf1",
    "fi22-test-2sf1",
    "fi22-test-2sf2",
    "fi12-test-2sf1",
];

const testBlockStore = {
    "abcs-123a-2sf1": {
        id: "abcs-123a-2sf1",
        type: "text",
        contents: []
    },
    "fi22-test-2sf1": {
        id: "fi22-test-2sf1",
        type: "text",
        contents: [
            {
                value: "볼드만 적용",
                style: {
                    color: "red",
                    type: ["bold", "underline", "line-through", "italic"],
                    size: "25px",
                    fontFamily: "Noto Sans KR"
                }
            }
        ]
    },
    "fi22-test-2sf2": {
        id: "fi22-test-2sf2",
        type: "text",
        contents: [
            {
                value: "취소선만 적용",
                style: {
                    color: "red",
                    type: ["line-through"],
                    size: "25px",
                    fontFamily: "Noto Sans KR"
                }
            }
        ]
    },
    "fi12-test-2sf1": {
        id: "fi12-test-2sf1",
        type: "table",
        contents: [
            "sdf", "asdf",
        ]
    }
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