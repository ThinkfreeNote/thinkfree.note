import React, {useContext, useEffect} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";
import useTable from "./hooks/useTable";
import {useTableMousePositionSetter} from "./hooks/useTableMousePositionHooks";
import {isCell} from "../../../utils/table";
import ColumnResizer from "./ColumnResizer";
import {BlockContext} from "../BlockContextProvider";
import {useMenu} from "../../common/MenuContext";
import {editorSelection} from "../../../App";
import {createPortal} from "react-dom";


import TableToolBox from "./TableToolBox";

function TableWrapper({children}) {
    const {blockId} = useContext(BlockContext);
    const tableData = useBlockData(blockId);
    const {isOpen, openMenu, closeMenu} = useMenu();

    const {addColumn, addRow} = useTable();
    const {clearPosition, setMousePosition} = useTableMousePositionSetter();

    const mouseLeaveHandler = () => {
        clearPosition();
    }

    const mouseMove = (e) => {
        const target = e.target;
        const $cell = isCell(target) ? target : (isCell(e.target.closest("[data-row-id]")) ?? null);
        if (!$cell) return;

        const [rowIdx, colIdx] = tableData.getIndexOfCell($cell);
        setMousePosition(rowIdx, colIdx);
    }

    // 셀렉션 변경 시 셀렉션이
    useEffect(() => {
        const openTableToolBox = (e) => {
            if (editorSelection.isNullSelection()) return;

            const {startElement} = editorSelection.getElement();
            if (startElement.dataset.cellId) {
                const tableId = editorSelection.getClosestId("block").start;
                if (tableId === blockId) {
                    openMenu();
                } else {
                    closeMenu();
                }
            } else {
                // closeMenu();
            }
        }
        document.addEventListener("selectionchange", openTableToolBox);

        return () => {
            document.removeEventListener("selectionchange", openTableToolBox);
        }
    }, []);

    return (
        <div className="table-block" onMouseLeave={mouseLeaveHandler}>
            <div className="table-box" onMouseMove={mouseMove}>
                {children}
                <button onClick={() => addColumn()} contentEditable={false} className="btn_add btn_add_column">+
                </button>
                <button onClick={() => addRow()} contentEditable={false} className="btn_add btn_add_row">+</button>
                <ColumnResizer/>
            </div>
            {isOpen && createPortal(<TableToolBox/>,document.querySelector(`[data-block-id="${blockId}"]`))}
        </div>
    );
}

export default TableWrapper;