import React from 'react';
import {ReactComponent as HamburgerIcon} from "../../../assets/icon_hamburger.svg";
import {ReactComponent as PlusIcon} from "../../../assets/icon_plus.svg";
import {useMenu} from "../../common/MenuContext";
import BlockContextMenu from "./BlockContextMenu";
import {createPortal} from "react-dom";

function BlockMenuBox(props) {
    const {openMenu, closeMenu,isOpen} = useMenu();
    return (
        <div contentEditable={false} className="block-menu-btn-box">
            <button className="block-menu-btn"><PlusIcon width="18px" height="18px" fill="black"/></button>
            <button className="block-menu-btn" onClick={(e)=>{
                openMenu(e.clientX,e.clientY);
            }}><HamburgerIcon width="18px" height="18px" fill="black"/></button>
            {isOpen && createPortal(<BlockContextMenu closeMenu={closeMenu}/>,document.body)}
        </div>
    );
}

export default BlockMenuBox;