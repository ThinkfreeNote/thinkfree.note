import React from 'react';
import NoteEditor from "../editor/NoteEditor";
import BlockIdListProvider from "../editor/context/BlockIdListProvider";
import EditorToolBox from "../editor/EditorToolBox";
import BlockReRenderContextProvider from "../editor/context/BlockReRenderContext";


function NoteEditorContainer() {
    return (
        <BlockIdListProvider>
            <BlockReRenderContextProvider>
                <NoteEditor/>
                <EditorToolBox/>
            </BlockReRenderContextProvider>
        </BlockIdListProvider>
    );
}

export default React.memo(NoteEditorContainer);