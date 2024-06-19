import React from 'react';
import {ContextMenu} from "./common/ContextMenu";
import {useNavigate} from "react-router-dom";

import {ReactComponent as DuplicateIcon} from "../assets/icon_duplicate.svg";
import {ReactComponent as DeleteIcon} from "../assets/icon_delete.svg";


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
            <ContextMenu.SubTitle text="문서 메뉴"/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain icon={<DuplicateIcon/>} name="복제"/>
            <ContextMenu.Plain icon={<DeleteIcon/>} name="삭제" handler={deleteNote}/>
        </ContextMenu>
    );
}

export default DocumentMenu;