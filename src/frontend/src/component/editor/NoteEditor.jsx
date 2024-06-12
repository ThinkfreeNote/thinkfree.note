import React, {createContext, useRef} from 'react';
import NoteBlockSwitcher from "./NoteBlockSwitcher";
import useEditHandler from "./hooks/useEditHandler";
import useBlockIdList from "./hooks/useBlockIdList";
import Title from "./Title";
import useEditorSelection from "./hooks/useEditorSelection";
import CommandWindow from "./CommandWindow";
import useSlash from "./useSlash";
import EditorToolBox from "./EditorToolBox";
import {editorSelection} from "../../App";
import {useBlockStore} from "./hooks/useBlockHooks";
import {useTableHandlers} from "./table/hooks/useTableHandlers";

export const EditorContext = createContext(null);

function NoteEditor() {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const {onKeyDownHandler : keyDownHandler} = useEditHandler();
    const tableHandler = useTableHandlers();
    // 하위 컴포넌트에서 에디터에 핸들러 등록하기 위한 ref
    const editorRef = useRef(null);
    const {slashComponent} = useSlash(editorRef);
    useEditorSelection(blockIdList);

    const onKeyDownHandler = (e) => {
        const blockId = editorSelection.blockId[0];
        const blockType = blockStore.getBlockType(blockId);

        keyDownHandler(e);

        // 테이블 관련 핸들러 등록
        blockType === "table" &&  tableHandler.keyDownHandler(e);
    }

    const onInputHandler = (e) => {
        const blockId = editorSelection.blockId[0];
        const blockType = blockStore.getBlockType(blockId);

        // 테이블 관련 핸들러 등록
        blockType === "table" && tableHandler.inputHandler(e);
    }


    return (
        <EditorContext.Provider value={editorRef}>
            <div id="editor" className="editor" spellCheck={false} ref={editorRef} onKeyDown={onKeyDownHandler} onInput={onInputHandler}
                 contentEditable={true}
                 suppressContentEditableWarning={true}>
                <Title/>
                {blockIdList.map(blockId => <NoteBlockSwitcher key={blockId} blockId={blockId}/>)}
            </div>
            <CommandWindow/>
            {slashComponent}
            <EditorToolBox/>
        </EditorContext.Provider>
    );
}

export default NoteEditor;