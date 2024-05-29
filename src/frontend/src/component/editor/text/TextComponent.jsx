import React, {useContext, useEffect} from 'react';
import {BlockStoreContext} from "../../container/NoteEditorContainer";
import {EditorContext} from "../NoteEditor";


function TextComponent({data}) {
    // 비어있는 블록
    if (data.contents.length === 0) {
        return (
            <>
                <p>&#xFEFF;</p>
            </>
        );
    } else {
        return (
            <>
                {data.contents.map((content, index) => (
                    <p key={index}
                       style={{...content.fontStyle}}
                    >
                        {content.value}
                    </p>
                ))}
            </>
        );
    }
}


export default TextComponent;