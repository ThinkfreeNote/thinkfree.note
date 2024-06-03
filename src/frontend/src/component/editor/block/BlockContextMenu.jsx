import React from 'react';
import {ContextMenu} from "../../common/ContextMenu";

function BlockContextMenu({closeMenu}) {
    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.DropDown name="전환">
                <ContextMenu.Plain name="텍스트박스"/>
                <ContextMenu.Plain name="테이블"/>
            </ContextMenu.DropDown>
            <ContextMenu.Divider/>
            <ContextMenu.Plain name="복사"/>
            <ContextMenu.Plain name="붙여넣기"/>
            <ContextMenu.Divider/>
            <ContextMenu.Plain name="삭제"/>
        </ContextMenu>
    );
}

export default BlockContextMenu;