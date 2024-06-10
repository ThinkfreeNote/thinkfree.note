import React from 'react';
import {ContextMenu} from "./common/ContextMenu";
import {useNavigate} from "react-router-dom";

function DocumentMenu({closeMenu,noteId}) {
    const navigate = useNavigate();
    const deleteNote = () =>{
        fetch(`http://localhost:8080/documents/${noteId}`,{
            method : "DELETE"
        }).then(res => res.json())
            .then(() => navigate("/"));
    }

    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.Plain name="복제"/>
            <ContextMenu.Plain name="삭제" handler={deleteNote}/>
        </ContextMenu>
    );
}

export default DocumentMenu;