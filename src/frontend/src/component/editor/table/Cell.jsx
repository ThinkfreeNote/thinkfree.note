import React from 'react';
import TableSelector from "./TableSelector";
import {useTableData} from "./hooks/useTableData";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const tableData = useTableData();
    const cellValue = tableData.getCellValue(rowId,cellId);

    return (
        <td data-cell-id={cellId} className="cell">
            <TableSelector colIdx={colIdx} rowIdx={rowIdx}/>
            {cellValue.length === 0 ? `\uFEFF` : cellValue}</td>
    );
}
export default Cell;