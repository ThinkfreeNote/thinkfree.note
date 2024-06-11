import React from 'react';
import NoteEditor from "../editor/NoteEditor";
import NoteDataProvider from "../editor/context/NoteDataProvider";
import BlockReRenderContextProvider from "../editor/context/BlockReRenderContext";
import SaveButton from "../editor/SaveButton";
import {useParams} from "react-router-dom";


function NoteEditorContainer() {
    const {noteId} = useParams();
    return (
        <NoteDataProvider key={noteId} noteId={noteId}>
            <BlockReRenderContextProvider>
                <NoteEditor/>
                <SaveButton/>
            </BlockReRenderContextProvider>
        </NoteDataProvider>
    );
}

export default React.memo(NoteEditorContainer);