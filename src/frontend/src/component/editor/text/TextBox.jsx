import React, {useState, useEffect, useContext} from 'react';
import {BlockStoreContext} from "../../container/NoteEditorContainer";
import {EditorContext} from "../NoteEditor";

function TextBox() {
    const [isHidden, setIsHidden] = useState(false);

    if (isHidden) {
        return;
    } else {
        return (
            <div contentEditable={false} className="textbox" style={{userSelect: "none"}}>
                <button>123</button><button></button>
            </div>
        );
    }
}

export default TextBox;
