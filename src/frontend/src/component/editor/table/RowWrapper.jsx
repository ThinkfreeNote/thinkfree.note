import React from 'react';
import {useTableData} from "./hooks/useTableData";

function RowWrapper({children, rowIdx, rowId}) {
    const tableData = useTableData();
    const isHeader = rowIdx === 0 && tableData.getHeaderByType("row");

    return (
        <tr data-row-id={rowId} className={`${isHeader ? "table-header" : ""} table-row`}>
            {children}
        </tr>
    );
}

export default RowWrapper;