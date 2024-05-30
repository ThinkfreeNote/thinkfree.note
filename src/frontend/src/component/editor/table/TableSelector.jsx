import React from 'react';
import {useTableMousePosition} from "./hooks/useTableMousePositionHooks";
import {createPortal} from "react-dom";
import {useMenu} from "../../common/MenuContext";
import TableMenu from "./TableMenu";
import {ReactComponent as SelectorIcon} from "../../../assets/icon_selector.svg";


function TableSelector({colIdx, rowIdx}) {
    const {row, col} = useTableMousePosition()
    return (<>
            {colIdx === 0 && <TableSelectorButton isShow={row === rowIdx} type="row" rowIdx={rowIdx} colIdx={colIdx}/>}
            {rowIdx === 0 && <TableSelectorButton isShow={col === colIdx} type="column" rowIdx={rowIdx} colIdx={colIdx}/>}
        </>
    );
}

const TableSelectorButton = ({isShow,type,rowIdx,colIdx}) => {
    const {isOpen, closeMenu, openMenu} = useMenu();
    const clickHandler = (e) => {
        openMenu(e.clientX, e.clientY);
    }
    return <>
        <button contentEditable={false} onClick={clickHandler} style={{opacity: isShow ? 1 : 0, transition: isShow ? "opacity .75s ease-out" : "none"}} className={type === "row" ? "table-selector-row" : "table-selector-col"}>
            <SelectorIcon/>
        </button>
        {isOpen && createPortal(<TableMenu closeMenu={closeMenu} rowIdx={rowIdx} colIdx={colIdx} type={type}/>, document.body)}
    </>
}

export default TableSelector;