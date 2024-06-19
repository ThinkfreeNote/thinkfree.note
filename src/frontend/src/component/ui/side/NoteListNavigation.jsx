import React from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useBookMark} from "../../context/BookMarkProvider";
import NoteListItem from "./NoteListItem";
import NoteListNewItem from "./NoteListNewItem";

function NoteListNavigation({noteList}) {
    const {noteId} = useParams();
    const location = useLocation();
    const {isBookMark} = useBookMark();

    return (
        <div className="noteList-nav">
            <h3>Favorites⭐</h3>
            {noteList.map((item) => {
                if(!isBookMark(item.id)) return;
                return <NoteListItem key={item.id} id={item.id} title={item.title}
                                     isSelected={Number(noteId) === item.id}/>
            })}
            <hr/>
            <h3>Note List</h3>
            {noteList.map((item) => {
                return <NoteListItem key={item.id} id={item.id} title={item.title}
                                     isSelected={Number(noteId) === item.id}/>
            })}
            {location.pathname === "/new" && <NoteListNewItem/>}
        </div>
    );
}

export default NoteListNavigation;