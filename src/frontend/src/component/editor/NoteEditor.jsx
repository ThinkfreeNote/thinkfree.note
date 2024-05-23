import React from 'react';
import NoteBlockSwitcher from "./NoteBlockSwitcher";

function NoteEditor({note, setNote}) {
    return (
        <div contentEditable={true} suppressContentEditableWarning={true}>
            {note.contents.map(blockId => <NoteBlockSwitcher key={blockId} blockId={blockId}/>)}
        </div>
    );
}

export default NoteEditor;