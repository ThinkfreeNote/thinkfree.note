import React from 'react';
import {ContextMenu} from "../../ui/menu/ContextMenu";
import useBlockIdList from "../hooks/useBlockIdList";
import {useBlockId, useBlockReRender} from "../BlockManagerProvider";
import {useBlockStore} from "../hooks/useBlockHooks";

import {ReactComponent as DuplicateIcon} from "../../../assets/icon_duplicate.svg";
import {ReactComponent as DeleteIcon} from "../../../assets/icon_delete.svg";
import {ReactComponent as TransIcon} from "../../../assets/icon_dashed_circle.svg";
import {ReactComponent as TextBlockIcon} from "../../../assets/icon_textBlock.svg";

function BlockContextMenu({closeMenu}) {
    const {blockId} = useBlockId();
    const {reRender} = useBlockReRender();
    const {deleteBlock, addBlockId, getIndexOfBlock} = useBlockIdList();
    const blockStore = useBlockStore();


    const deleteHandler = () => {
        deleteBlock(blockId);
        reRender();
        closeMenu();
    }

    const duplicateHandler = () => {
        const duplicatedBlockId = blockStore.duplicateBlock(blockId)
        addBlockId(duplicatedBlockId, getIndexOfBlock(blockId) + 1);
        reRender();
        closeMenu();
    }

    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.SubTitle text={"블록 메뉴"}/>
            <ContextMenu.Divider/>
            {/*<ContextMenu.Plain icon={<TransIcon/>} name="전환"/>*/}
            {/*<ContextMenu.DropDown icon={<TransIcon/>} name="전환">*/}
            {/*    <ContextMenu.Plain icon={<TextBlockIcon/>} name="텍스트박스"/>*/}
            {/*</ContextMenu.DropDown>*/}
            <ContextMenu.Plain icon={<DuplicateIcon/>} name="복제" handler={duplicateHandler}/>
            <ContextMenu.Plain icon={<DeleteIcon/>} name="삭제" handler={deleteHandler}/>
        </ContextMenu>
    );
}

export default BlockContextMenu;