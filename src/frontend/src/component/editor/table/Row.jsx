import React from 'react';
import Cell from "./Cell";
import {useTableData} from "./hooks/useTableData";

function Row({rowId, rowIdx}) {
    const tableData = useTableData();
    const isHeader = rowIdx === 0 && tableData.getHeaderByType("row");

    return (
        <tr data-row-id={rowId} className={`${isHeader ? "table-header" : ""}`}>
            {tableData.getFormat().map((cellId, idx) => {
                return <Cell key={cellId} rowId={rowId} cellId={cellId} colIdx={idx} rowIdx={rowIdx}/>
            })}
        </tr>
    );
}

export default Row;