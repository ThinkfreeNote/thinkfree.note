import React, {useContext} from 'react';
import {useBlockStore} from "./hooks/useBlockHooks";
import useBlockIdList from "./hooks/useBlockIdList";
import {useNavigate, useParams} from "react-router-dom";
import {NoteTitleContext} from "./context/NoteTitleProvider";

function SaveButton() {
    const {noteId} = useParams();
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const navigate = useNavigate();
    const {title} = useContext(NoteTitleContext);

    const postData = {
        blockIdList,
        blocks: {},
    }
    Object.assign(postData.blocks, blockStore);

    const saveNote = () => {
        fetch("http://localhost:8080/documents", {
            method: "POST",
            body: JSON.stringify({
                title: title.length === 0 ? "Untitled" : title,
                content: JSON.stringify(postData)
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data =>
            navigate(`/${data}`)
        )
    }

    const updateNote = () => {
        fetch("http://localhost:8080/documents", {
            method: "PATCH",
            body: JSON.stringify({
                id: noteId,
                title: title.length === 0 ? "Untitled" : title,
                content: JSON.stringify(postData),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(data => console.log(data))
    }

    return (
        <button className="note-save-button" onClick={noteId ? updateNote : saveNote}>
            {!noteId && "새"} 노트 저장
        </button>
    );
}

export default SaveButton;