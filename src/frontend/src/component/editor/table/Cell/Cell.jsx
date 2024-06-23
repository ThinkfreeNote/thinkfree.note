import React from 'react';
import {useTableData} from "../hooks/useTableData";
import CellWrapper from "./CellWrapper";
import {useTableCursorPosition} from "../contexts/TableSelectionProvider";
import {useCalc} from "./hooks/useCalc";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const tableData = useTableData();
    const {text} = tableData.getRow(rowId).getCell(cellId);
    const {isSelected} = useTableCursorPosition(rowId,cellId);

    const {calculate} = useCalc(tableData);

    let contents = !isSelected ? calculate(text,new Set([`${rowIdx},${colIdx}`])) : (text.startsWith("=") ? text.toUpperCase() : text);
    return <CellWrapper key={text} cellId={cellId} rowId={rowId} colIdx={colIdx} rowIdx={rowIdx} isSelected={isSelected}>
        {contents.length !== 0 ? contents : <br/>}
    </CellWrapper>
}

export default Cell;