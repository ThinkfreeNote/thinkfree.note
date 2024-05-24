import React from 'react';
import NoteBlockSwitcher from "./NoteBlockSwitcher";
import useEditHandler from "./hooks/useEditHandler";

function NoteEditor({noteContents, setNoteContents}) {
    const {onKeyDownHandler,onClick} = useEditHandler(noteContents,setNoteContents);

    return (
        <div onClick={onClick} onKeyDown={onKeyDownHandler} contentEditable={true} suppressContentEditableWarning={true}>
            {noteContents.map(blockId => <NoteBlockSwitcher key={blockId} blockId={blockId}/>)}
        </div>
    );
}

export default NoteEditor;