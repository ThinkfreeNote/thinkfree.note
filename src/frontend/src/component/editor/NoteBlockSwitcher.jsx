import React from 'react';
import BlockWrapper from "./BlockWrapper";
import TextBlock from "./text/TextBlock";
import TableBlock from "./table/TableBlock";
import {useBlockStore} from "./hooks/useBlockHooks";

const switcher = (type, id) => {
    switch (type) {
        case "text" :
            return <TextBlock blockId={id}/>
        case "table" :
            return <TableBlock blockId={id}/>
        default :
            return <TextBlock blockId={id}/>
    }
}

function NoteBlockSwitcher({blockId}) {
    const blockStore = useBlockStore();
    const {type, id} = blockStore[blockId];

    return <BlockWrapper id={blockId} type={type}>
        {switcher(type,id)}
    </BlockWrapper>
}

export default NoteBlockSwitcher;