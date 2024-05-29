import React, {useContext, useEffect} from 'react';
import {BlockStoreContext} from "../../container/NoteEditorContainer";
import {EditorContext} from "../NoteEditor";


function TextComponent({data}) {
    return (
        <div style={data.fontStyle}>
            {data.value}
        </div>
    )
}


export default TextComponent;