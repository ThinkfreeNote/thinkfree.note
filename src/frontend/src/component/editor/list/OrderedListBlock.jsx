import React, {useEffect} from 'react';
import ListBlock from "./ListBlock";
import {useIndexList} from "../context/NoteIndexListProvider";
import {useBlockId} from "../BlockManagerProvider";
import {useSelectionManager} from "../../context/SelectionManagerProvider";

function OrderedListBlock() {
    const {blockId} = useBlockId();
    const {getOrder} = useIndexList();
    const {recoveryPosition} = useSelectionManager();

    useEffect(() => {
        recoveryPosition();
    }, []);

    return (
        <ListBlock index={getOrder(blockId)}/>
    );
}

export default OrderedListBlock;