import React from 'react';
import BlockWrapper from "./BlockWrapper";
import TextBlock from "./text/TextBlock";
import TableBlock from "./table/TableBlock";
import {useBlockStore} from "./hooks/useBlockHooks";
import ListBlock from "./list/ListBlock";

const switcher = (type, id, index) => {
    switch (type) {
        case "text" :
            return <TextBlock blockId={id}/>
        case "ol" :
            return <ListBlock blockId={id} type={type}/>
        case "ul" :
            return <ListBlock blockId={id} type={type}/>
        case "table" :
            return <TableBlock blockId={id}/>
        default :
            return <TextBlock blockId={id}/>
    }
}

function NoteBlockSwitcher({blockId, index}) {
    const blockStore = useBlockStore();
    const {type, id} = blockStore[blockId];

    return <BlockWrapper id={blockId} type={type} index={index}>
        {switcher(type, id, index)}
    </BlockWrapper>
}

export default NoteBlockSwitcher;