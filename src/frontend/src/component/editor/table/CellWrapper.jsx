import React from 'react';
import {useTableData} from "./hooks/useTableData";
import TableSelector from "./TableSelector";
import CellRight from "./CellRight";

function CellWrapper({children,colIdx,cellId,rowIdx}) {
    const tableData = useTableData();
    const isHeader = colIdx === 0 && tableData.getHeaderByType("column");

    return (
        <td data-cell-id={cellId} className={`cell ${isHeader ? "table-header" : ""}`}>
            <TableSelector colIdx={colIdx} rowIdx={rowIdx}/>
            {children}
            <CellRight columnId={cellId}/>
        </td>
    );
}

export default CellWrapper;