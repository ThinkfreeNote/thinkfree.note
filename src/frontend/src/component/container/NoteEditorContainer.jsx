import React from 'react';
import NoteEditor from "../editor/NoteEditor";
import BlockIdListProvider from "../editor/context/BlockIdListProvider";

function NoteEditorContainer() {
    return (
        <BlockIdListProvider>
            <NoteEditor/>
        </BlockIdListProvider>
    );
}

export default React.memo(NoteEditorContainer);