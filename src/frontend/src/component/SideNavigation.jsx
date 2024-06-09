import React, {useEffect, useState} from 'react';
import UserDashBoard from "./UserDashBoard";
import NoteListNavigation from "./editor/NoteListNavigation";
import {useParams} from "react-router-dom";
import NewNoteButton from "./editor/NewNoteButton";

function SideNavigation() {
    const {noteId} = useParams();
    const [documentList, setDocumentList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/documents/titles")
            .then(res => res.json())
            .then(data => {
                setDocumentList(data);
            });
    }, [noteId]);
    return (
        <aside className="side-nav">
            <UserDashBoard/>
            <hr/>
            <NoteListNavigation noteList={documentList} />
            <NewNoteButton/>
        </aside>
    );
}

export default SideNavigation;