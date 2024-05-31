import React from 'react';
import Cell from "./Cell";
import {useTableData} from "./hooks/useTableData";
import RowWrapper from "./RowWrapper";

function Row({rowId, rowIdx}) {
    const tableData = useTableData();

    return (
        <RowWrapper rowIdx={rowIdx} rowId={rowId}>
            {tableData.getFormat().map((cellId, idx) => {
                return (<Cell key={cellId} rowId={rowId} cellId={cellId} colIdx={idx} rowIdx={rowIdx}/>)
            })}
        </RowWrapper>
    );
}

export default Row;