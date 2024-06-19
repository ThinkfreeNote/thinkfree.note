import React, {createContext, useRef} from 'react';
import NoteBlockSwitcher from "./NoteBlockSwitcher";
import useEditorHandler from "./hooks/useEditorHandler";
import useBlockIdList from "./hooks/useBlockIdList";
import Title from "./Title";
import useEditorSelection from "./hooks/useEditorSelection";
import CommandWindow from "./CommandWindow";
import useSlash from "./useSlash";
import EditorToolBox from "./EditorToolBox";
import {NoteIndexListProvider} from "./context/NoteIndexListProvider";

export const EditorContext = createContext(null);

function NoteEditor() {
    const {blockIdList} = useBlockIdList();
    const editorRef = useRef(null);
    const {slashComponent} = useSlash(editorRef);

    // 에디터 셀렉션을 추적하는 핸들러
    useEditorSelection(blockIdList);

    // contentEditable div 요소에서 처리할 이벤트 핸들러
    const {onKeyDownHandler,onInputHandler} = useEditorHandler();

    return (
        <EditorContext.Provider value={editorRef}>
            <div id="editor" className="editor" spellCheck={false} ref={editorRef} onKeyDown={onKeyDownHandler} onInput={onInputHandler}
                 contentEditable={true}
                 suppressContentEditableWarning={true}>
                <Title/>
                {blockIdList.map((blockId, index) => <NoteBlockSwitcher key={blockId} blockId={blockId} index={index}/>)}
            </div>
            <CommandWindow/>
            {slashComponent}
            <EditorToolBox/>
        </EditorContext.Provider>
    );
}

export default NoteEditor;