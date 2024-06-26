import React, {useContext} from 'react';
import {BlockStoreContext} from "../container/NoteEditorContainer";

function TableBlock({blockId}) {
    const blockStore = useContext(BlockStoreContext);
    const data = blockStore[blockId];
    return (
        <div>&#xFEFF;</div>
    );
}

export default TableBlock;