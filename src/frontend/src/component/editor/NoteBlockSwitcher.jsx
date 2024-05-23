import React, {useContext} from 'react';
import {BlockStoreContext} from "../container/NoteEditorContainer";
import BlockWrapper from "./BlockWrapper";
import TextBlock from "./TextBlock";
import TableBlock from "./TableBlock";

const switcher = (blockData) => {
    switch (blockData.type) {
        case "text" :
            return <TextBlock/>
        case "table" :
            return <TableBlock/>
        default :
            return <TextBlock/>
    }
}

function NoteBlockSwitcher({blockId}) {
    const blockStore = useContext(BlockStoreContext);
    const blockData = blockStore[blockId];

    return <BlockWrapper>
        {switcher(blockData)}
    </BlockWrapper>
}

export default NoteBlockSwitcher;