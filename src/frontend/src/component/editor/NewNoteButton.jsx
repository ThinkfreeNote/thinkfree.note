import React from 'react';
import {Link} from "react-router-dom";

function NewNoteButton() {
    return (
        <Link to={"/new"} className="new-note-button">새 노트 생성</Link>
    );
}

export default NewNoteButton;