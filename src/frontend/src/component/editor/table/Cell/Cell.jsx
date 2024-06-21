import React from 'react';
import {useTableData} from "../hooks/useTableData";
import CellWrapper from "./CellWrapper";
import {useTableCursorPosition} from "../contexts/TableSelectionProvider";
import {useCalc} from "./hooks/useCalc";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const tableData = useTableData();
    const cell = tableData.getRow(rowId).getCell(cellId);
    const {isSelected} = useTableCursorPosition(rowId,cellId);

    const {calculate} = useCalc(tableData);

    const contents = !isSelected ? calculate(cell.text) : cell.text;
    return <CellWrapper key={cell.text} cellId={cellId} rowId={rowId} colIdx={colIdx} rowIdx={rowIdx} isSelected={isSelected}>
        {contents.length !== 0 ? contents : <br/>}
    </CellWrapper>
}

export default Cell;