import React, {createContext, useRef} from 'react';
import NoteBlockSwitcher from "./NoteBlockSwitcher";
import useEditHandler from "./hooks/useEditHandler";

export const EditorContext = createContext(null);

function NoteEditor({noteContents, setNoteContents}) {
    const {onKeyDownHandler} = useEditHandler(noteContents, setNoteContents);
    const editorRef = useRef(null);

    return (
        <EditorContext.Provider value={editorRef}>
            <div className="editor" spellCheck={false} ref={editorRef} onKeyDown={onKeyDownHandler} contentEditable={true}
                 suppressContentEditableWarning={true}>
                {noteContents.map(blockId => <NoteBlockSwitcher key={blockId} blockId={blockId}/>)}
            </div>
        </EditorContext.Provider>
    );
}

export default NoteEditor;