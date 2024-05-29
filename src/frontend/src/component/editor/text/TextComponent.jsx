import React, {useContext, useEffect} from 'react';
import {BlockStoreContext} from "../../container/NoteEditorContainer";
import {EditorContext} from "../NoteEditor";


function TextComponent({data}) {
    return (
        <div style={data.fontStyle}>
            <p>{data.value}</p>
        </div>
    )
}


export default TextComponent;