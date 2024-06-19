import React from 'react';
import NoteEditor from "../editor/NoteEditor";
import NoteDataProvider from "../editor/context/NoteDataProvider";
import BlockReRenderProvider from "../editor/context/BlockReRenderContext";
import SaveButton from "../editor/SaveButton";
import {useParams} from "react-router-dom";
import SelectionManagerProvider from "../context/SelectionManagerProvider";
import {NoteIndexListProvider} from "../editor/context/NoteIndexListProvider";


function NoteEditorContainer() {
    const {noteId} = useParams();
    return (
        <NoteDataProvider key={noteId} noteId={noteId}>
            <NoteIndexListProvider>
                <SelectionManagerProvider>
                    <BlockReRenderProvider>
                        {/* 에디터 */}
                        <NoteEditor/>
                        <SaveButton/>
                    </BlockReRenderProvider>
                </SelectionManagerProvider>
            </NoteIndexListProvider>
        </NoteDataProvider>
    );
}

export default React.memo(NoteEditorContainer);