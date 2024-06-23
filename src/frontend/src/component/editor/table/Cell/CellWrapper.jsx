import React, {useEffect} from 'react';
import {useTableData} from "../hooks/useTableData";
import TableSelector from "./TableSelector";
import CellRight from "./CellRight";
import {EditorSelection} from "../../../../model/Selection";
import {useSelectionManager} from "../../../context/SelectionManagerProvider";

function CellWrapper({children, colIdx, cellId, rowIdx, rowId, isSelected}) {
    const tableData = useTableData();
    const {text} = tableData.getRow(rowId).getCell(cellId);
    const isHeader = colIdx === 0 && tableData.getHeaderByType("column");
    const {color, bgColor, bold} = tableData.getCellValue(rowId, cellId, !isSelected);
    const {setEditorCaretPosition} = useSelectionManager();


    useEffect(() => {
        if(isSelected && text.startsWith("=")) {
            setEditorCaretPosition(tableData.id,[rowId,cellId],EditorSelection.LAST_OFFSET,"table");
        }
    }, [isSelected]);

    return (
        <td
            style={{ color, backgroundColor: bgColor, fontWeight: bold && 600}}
            data-cell-id={cellId} className={`cell ${isHeader ? "table-header" : ""} ${isSelected ? "selected" : ""}`}
            data-leaf={true}>
            <TableSelector colIdx={colIdx} rowIdx={rowIdx}/>
            {children}
            <CellRight columnId={cellId}/>
        </td>
    );
}

export default CellWrapper;