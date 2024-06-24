import React from 'react';
import ListBlock from "./ListBlock";
import {useIndexList} from "../context/NoteIndexListProvider";
import {useBlockId} from "../BlockManagerProvider";

function OrderedListBlock() {
    const {blockId} = useBlockId();
    const {getOrder} = useIndexList();

    return (
        <ListBlock index={getOrder(blockId)}/>
    );
}

export default OrderedListBlock;