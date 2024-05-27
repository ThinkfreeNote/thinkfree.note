import React, {useContext, useEffect} from 'react';
import {BlockStoreContext} from "../../../container/NoteEditorContainer";


function UseTable({contentEditableRef, blockId}) {
    const blockStore = useContext(BlockStoreContext);
    const blockData = blockStore[blockId];

    useEffect(() => {
        if (!contentEditableRef.current) return;

        const handler = (e) => {
            const {anchorNode, focusNode} = window.getSelection();

        }
        contentEditableRef.current.addEventListener("input", handler)

        return () => {
            contentEditableRef.current.removeEventListener("input", handler)
        }

    }, [contentEditableRef]);

    return [blockData]
}

export default UseTable;