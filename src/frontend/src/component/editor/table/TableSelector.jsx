import React, {useContext} from 'react';
import {TableSelectorContext} from "./contexts/TableSelectorProvider";
import {TableMenuSetterContext} from "./contexts/TableMenuContextProvider";


const TableSelectorButton = ({isShow, type}) => {
    const menuDispatch = useContext(TableMenuSetterContext);
    const clickHandler = (e) => {
        menuDispatch && menuDispatch({type: "updateOffset", x: e.clientX, y: e.clientY});
    }
    return <button contentEditable={false} onClick={clickHandler}
                   style={{
                       userSelect: "none",
                       opacity: isShow ? 1 : 0,
                       transition: isShow ? "opacity .75s ease-out" : "none"
                   }}
                   className={type === "row" ? "table-selector-row" : "table-selector-col"}
    >
        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0 1.5c.414 0 .75.336.75.75s-.336.75-.75.75-.75-.336-.75-.75.336-.75.75-.75zm0-8.25c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0 1.5c.414 0 .75.336.75.75s-.336.75-.75.75-.75-.336-.75-.75.336-.75.75-.75zm0-8.25c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0 1.5c.414 0 .75.336.75.75s-.336.75-.75.75-.75-.336-.75-.75.336-.75.75-.75z"/>
        </svg>
    </button>
}

function TableSelector({colIdx, rowIdx}) {
    const {row, col} = useContext(TableSelectorContext);
    return (<>
            {colIdx === 0 && <TableSelectorButton isShow={row === rowIdx} type="row"/>}
            {rowIdx === 0 && <TableSelectorButton isShow={col === colIdx} type="col"/>}
        </>

    );
}

export default TableSelector;