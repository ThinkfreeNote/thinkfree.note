import React from 'react';
import {ReactComponent as HamburgerIcon} from "../../../assets/icon_hamburger.svg";
import {ReactComponent as PlusIcon} from "../../../assets/icon_plus.svg";
import {useMenu} from "../../ui/menu/MenuContext";
import BlockContextMenu from "./BlockContextMenu";
import {createPortal} from "react-dom";
import {useBlockId} from "../BlockManagerProvider";
import BlockSelectMenu from "../BlockSelectMenu";
import {useMouseHoverBlockId} from "../context/EditorMouseHoverProvider";

function BlockMenuBox({isDepth}) {
    const {blockId} = useBlockId();
    const {openMenu, closeMenu,isOpen} = useMenu();
    const AddBlockMenu = useMenu();

    const addBlockHandler = (e) => {
        AddBlockMenu.openMenu(e.clientX,e.clientY);
    }

    const hoverBlockId = useMouseHoverBlockId();

    return (
        <div contentEditable={false} className={`block-menu-btn-box ${hoverBlockId === blockId && "isHover"}`}>
            {!isDepth && <button className="block-menu-btn" onClick={addBlockHandler}><PlusIcon width="18px" height="18px"
                                                                                    fill="black"/></button>}
            <button draggable={true} className="block-menu-btn" onClick={(e)=>{
                openMenu(e.clientX,e.clientY);
            }}><HamburgerIcon width="18px" height="18px" fill="black"/></button>
            {isOpen && createPortal(<BlockContextMenu closeMenu={closeMenu}/>,document.body)}
            {AddBlockMenu.isOpen && createPortal(<BlockSelectMenu closeMenu={AddBlockMenu.closeMenu} blockId={blockId}/>,document.body)}
        </div>
    );
}

export default BlockMenuBox;