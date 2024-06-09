import React from 'react';
import {useBlockStore} from "./hooks/useBlockHooks";
import useBlockIdList from "./hooks/useBlockIdList";

function SaveButton() {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();

    const postData = {
        blockIdList,
        blocks : {},
    }
    Object.assign(postData.blocks, blockStore);

    const saveNote = () => {
        fetch("http://localhost:8080/documents",{
            method : "POST",
            body : JSON.stringify({
                title : "1",
                content : JSON.stringify(postData)
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(data => console.log(data))
    }

    return (
        <button className="note-save-button" onClick={saveNote}>노트 저장</button>
    );
}

export default SaveButton;