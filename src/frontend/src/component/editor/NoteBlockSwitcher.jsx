import React, {useContext} from 'react';
import {BlockStoreContext} from "./context/BlockIdListProvider";
import BlockWrapper from "./BlockWrapper";
import TextBlock from "./TextBlock";
import TableBlock from "./table/TableBlock";

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
    const blockStore = useContext(BlockStoreContext);
    const {type, id} = blockStore[blockId];

    return <BlockWrapper id={blockId}>
        {switcher(type,id)}
    </BlockWrapper>
}

export default NoteBlockSwitcher;