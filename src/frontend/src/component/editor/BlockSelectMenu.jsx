import React from 'react';
import {ContextMenu} from "../ui/menu/ContextMenu";
import useBlockIdList from "./hooks/useBlockIdList";
import {useBlockStore} from "./hooks/useBlockHooks";
import {ReactComponent as TextBlockIcon} from "../../assets/icon_textBlock.svg";
import {ReactComponent as UnorderedIcon} from "../../assets/icon_unorderedList.svg";
import {ReactComponent as TableIcon} from "../../assets/icon_table.svg";
import {useSelectionManager} from "../context/SelectionManagerProvider";
import {EditorSelection} from "../../model/Selection";

function BlockSelectMenu({closeMenu, blockId}) {
    const {addBlockId, getIndexOfBlock} = useBlockIdList();
    const blockStore = useBlockStore();
    const {setEditorCaretPosition} = useSelectionManager();

    const addBlock = (type, headLevel) => {
        // TODO: 만들고 아이디 반환
        const newBlock = blockStore.createNewBlock(type, [], headLevel);
        addBlockId(newBlock.id, getIndexOfBlock(blockId) + 1);
        closeMenu();
        setEditorCaretPosition(newBlock.id,newBlock.getFirstBlockOffset(),EditorSelection.FRONT_OFFSET,type);

    }
    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.SubTitle text="기본 Blocks"/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("text")} name="텍스트"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 1)} name="제목1"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 2)} name="제목2"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("head", 3)} name="제목3"/>
            <ContextMenu.Plain icon={<TextBlockIcon/>} handler={() => addBlock("contents")} name="목차"/>
            <ContextMenu.Plain icon={<UnorderedIcon/>} handler={() => addBlock("ul")} name="순서 없는 리스트"/>
            <ContextMenu.Plain icon={<UnorderedIcon/>} handler={() => addBlock("ol")} name="순서 있는 리스트"/>
            <ContextMenu.Plain icon={<UnorderedIcon/>} handler={() => addBlock("quote")} name="인용"/>
            <ContextMenu.Plain icon={<TableIcon/>} handler={() => addBlock("table")} name="테이블"/>
        </ContextMenu>
    );
}

export default BlockSelectMenu;