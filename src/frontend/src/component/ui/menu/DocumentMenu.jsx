import React from 'react';
import {ContextMenu} from "./ContextMenu";
import {useNavigate} from "react-router-dom";

import {ReactComponent as DuplicateIcon} from "../../../assets/icon_duplicate.svg";
import {ReactComponent as DeleteIcon} from "../../../assets/icon_delete.svg";
import {ReactComponent as StarFillIcon} from "../../../assets/icon_star_fill.svg";
import {ReactComponent as StarIcon} from "../../../assets/icon_start.svg";
import {useBookMark} from "../../context/BookMarkProvider";



function DocumentMenu({closeMenu,noteId}) {
    const navigate = useNavigate();
    const deleteNote = () =>{
        fetch(`http://localhost:8080/documents/${noteId}`,{
            method : "DELETE"
        }).then(res => res.json())
            .then(() => navigate("/"));
    }
    const {isBookMark, addBookMark, deleteBookMark} = useBookMark();


    const onClickBookMark = (e) => {
        isBookMark(noteId) ? deleteBookMark(noteId) : addBookMark(noteId);
        closeMenu();
    }

    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.SubTitle text="문서 메뉴"/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain icon={isBookMark(noteId) ? <StarIcon/> : <StarFillIcon/>} name={`즐겨찾기 ${isBookMark(noteId) ? "해제" : "등록"}`} handler={onClickBookMark}/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain icon={<DuplicateIcon/>} name="복제"/>
            <ContextMenu.Plain icon={<DeleteIcon/>} name="삭제" handler={deleteNote}/>
        </ContextMenu>
    );
}

export default DocumentMenu;