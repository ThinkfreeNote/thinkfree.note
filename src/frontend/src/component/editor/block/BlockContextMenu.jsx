import React, {useContext} from 'react';
import {ContextMenu} from "../../common/ContextMenu";
import useBlockIdList from "../hooks/useBlockIdList";
import {BlockContext} from "../BlockContextProvider";
import {useBlockStore} from "../hooks/useBlockHooks";

function BlockContextMenu({closeMenu}) {
    const {blockId,reRender} = useContext(BlockContext);
    const {deleteBlock,addBlockId ,getIndexOfBlock} = useBlockIdList();
    const blockStore = useBlockStore();


    const deleteHandler = () => {
        deleteBlock(blockId);
        reRender();
        closeMenu();
    }

    const duplicateHandler = () => {
        const duplicatedBlockId = blockStore.duplicateBlock(blockId)
        addBlockId(duplicatedBlockId,getIndexOfBlock(blockId)+1);
        reRender();
        closeMenu();
    }

    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.DropDown name="전환">
                <ContextMenu.Plain name="텍스트박스"/>
            </ContextMenu.DropDown>
            <ContextMenu.Divider/>
            <ContextMenu.Plain name="복제" handler={duplicateHandler}/>
            <ContextMenu.Plain name="삭제" handler={deleteHandler}/>
        </ContextMenu>
    );
}

export default BlockContextMenu;