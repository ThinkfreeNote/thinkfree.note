import React from 'react';
import {useTableData} from "./hooks/useTableData";
import CellWrapper from "./CellWrapper";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const value = useTableData().getCellValue(rowId,cellId);

    return <CellWrapper cellId={cellId} rowId={rowId} colIdx={colIdx} rowIdx={rowIdx}>
        {value.length === 0 ? `\uFEFF` : value}
    </CellWrapper>

}
export default Cell;