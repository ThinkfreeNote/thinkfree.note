import React from 'react';
import NoteBlockSwitcher from "./NoteBlockSwitcher";

function NoteEditor({note, setNote}) {

    const onKeyDownHandler = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            setNote({...note})
        }
    }
    return (
        <div onKeyDown={onKeyDownHandler} contentEditable={true} suppressContentEditableWarning={true}>
            {note.contents.map(blockId => <NoteBlockSwitcher key={blockId} blockId={blockId}/>)}
        </div>
    );
}

export default NoteEditor;