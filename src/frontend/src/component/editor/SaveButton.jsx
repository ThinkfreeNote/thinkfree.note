import React, {useContext} from 'react';
import {useBlockStore} from "./hooks/useBlockHooks";
import useBlockIdList from "./hooks/useBlockIdList";
import {useParams} from "react-router-dom";
import {NoteTitleContext} from "./context/NoteTitleProvider";
import {useNoteDataFetch} from "./context/NoteDataProvider";

function SaveButton() {
    const {noteId} = useParams();
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const {title} = useContext(NoteTitleContext);
    const {saveNote,updateNote} =  useNoteDataFetch();

    const postData = {
        blockIdList,
        blocks: {},
    }
    Object.assign(postData.blocks, blockStore);

    return (
        <button className="note-save-button" onClick={()=>{
            noteId ? updateNote(noteId,title,postData) : saveNote(title,postData);
        }}>
            {!noteId && "새"} 노트 저장
        </button>
    );
}

export default SaveButton;