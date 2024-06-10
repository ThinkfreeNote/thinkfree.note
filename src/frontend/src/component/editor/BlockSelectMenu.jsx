import React from 'react';
import {ContextMenu} from "../common/ContextMenu";
import useBlockIdList from "./hooks/useBlockIdList";
import {useBlockStore} from "./hooks/useBlockHooks";

function BlockSelectMenu({closeMenu, blockId}) {
    const {addBlockId, getIndexOfBlock} = useBlockIdList();
    const blockStore = useBlockStore();

    const addBlock = (type) => {
        // TODO: 만들고 아이디 반환
        addBlockId(blockStore.createBlock(type).id, getIndexOfBlock(blockId) + 1);
        closeMenu();
    }
    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.SubTitle text="기본 Blocks"/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain handler={() => addBlock("text")} name="텍스트"/>
            <ContextMenu.Plain handler={() => addBlock("ul")} name="순서 없는 리스트"/>
            <ContextMenu.Plain handler={() => addBlock("ol")} name="순서 있는 리스트"/>
            <ContextMenu.Plain handler={() => addBlock("table")} name="테이블"/>
        </ContextMenu>
    );
}

export default BlockSelectMenu;