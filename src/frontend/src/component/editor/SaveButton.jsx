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

    const clickHandler = () => {
        // noteId가 있으면 업데이트, 없으면 새로 저장
        noteId ? updateNote(noteId,title,postData) : saveNote(title,postData);
    }

    return (
        <button className="note-save-button" onClick={clickHandler}>
            {!noteId && "새"} 노트 저장
        </button>
    );
}

export default SaveButton;