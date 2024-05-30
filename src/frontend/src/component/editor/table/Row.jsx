import React from 'react';
import Cell from "./Cell";
import {useTableData} from "./hooks/useTableData";

function Row({rowId, rowIdx}) {
    const tableData = useTableData();

    return (
        <tr  data-row-id={rowId}>
            {tableData.getFormat().map((cellId, idx) => {
                return <Cell key={cellId} rowId={rowId} cellId={cellId} colIdx={idx} rowIdx={rowIdx}/>
            })}
        </tr>
    );
}

export default Row;