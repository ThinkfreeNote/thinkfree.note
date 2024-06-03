import React from 'react';
import {ContextMenu} from "../common/ContextMenu";
import useBlockIdList from "./hooks/useBlockIdList";
import {useBlockStore} from "./hooks/useBlockHooks";

function BlockSelectMenu({closeMenu, blockId}) {
    const {addBlockId, getIndexOfBlock} = useBlockIdList();
    const blockStore = useBlockStore();

    const addBlock = (type) => {
        addBlockId(blockStore.createBlock(type).id, getIndexOfBlock(blockId) + 1);
        closeMenu();
    }
    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.SubTitle text="기본 Blocks"/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain handler={() => addBlock("text")} name="텍스트"/>
            <ContextMenu.Plain handler={() => addBlock("table")} name="테이블"/>
        </ContextMenu>
    );
}

export default BlockSelectMenu;