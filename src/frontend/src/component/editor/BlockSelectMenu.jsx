import React from 'react';
import {ContextMenu} from "../ui/menu/ContextMenu";
import useBlockIdList from "./hooks/useBlockIdList";
import {useBlockStore} from "./hooks/useBlockHooks";
import {ReactComponent as TextBlockIcon} from "../../assets/icon_textBlock.svg";
import {ReactComponent as UnorderedIcon} from "../../assets/icon_unorderedList.svg";
import {ReactComponent as TableIcon} from "../../assets/icon_table.svg";

function BlockSelectMenu({closeMenu, blockId}) {
    const {addBlockId, getIndexOfBlock} = useBlockIdList();
    const blockStore = useBlockStore();

    const addBlock = (type, headLevel) => {
        // TODO: 만들고 아이디 반환
        addBlockId(blockStore.createNewBlock(type, [], headLevel).id, getIndexOfBlock(blockId) + 1);
        closeMenu();
    }
    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.SubTitle text="기본 Blocks"/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("text")} name="텍스트"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 1)} name="h1"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 2)} name="h2"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 3)} name="h3"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 4)} name="h4"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 5)} name="h5"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 6)} name="h6"/>
            <ContextMenu.Plain icon={<UnorderedIcon/>} handler={() => addBlock("ul")} name="순서 없는 리스트"/>
            <ContextMenu.Plain icon={<UnorderedIcon/>} handler={() => addBlock("ol")} name="순서 있는 리스트"/>
            <ContextMenu.Plain icon={<TableIcon/>} handler={() => addBlock("table")} name="테이블"/>
        </ContextMenu>
    );
}

export default BlockSelectMenu;