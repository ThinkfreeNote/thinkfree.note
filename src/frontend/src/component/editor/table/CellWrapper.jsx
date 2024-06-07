import React from 'react';
import {useTableData} from "./hooks/useTableData";
import TableSelector from "./TableSelector";
import CellRight from "./CellRight";

function CellWrapper({children,colIdx,cellId,rowIdx, style, isSelected}) {
    const tableData = useTableData();
    const isHeader = colIdx === 0 && tableData.getHeaderByType("column");

    return (
        <td style={style} data-cell-id={cellId} className={`cell ${isHeader ? "table-header" : ""} ${isSelected ? "selected" : ""}`} data-leaf={true}>
            <TableSelector colIdx={colIdx} rowIdx={rowIdx}/>
            {children}
            <CellRight columnId={cellId}/>
        </td>
    );
}

export default CellWrapper;