import React from 'react';
import {useTableData} from "./hooks/useTableData";
import CellWrapper from "./CellWrapper";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const {value, color, bgColor, bold} = useTableData().getCellValue(rowId, cellId);

    return <CellWrapper cellId={cellId} rowId={rowId} colIdx={colIdx} rowIdx={rowIdx}
                        style={{color: color ?? null, backgroundColor: bgColor ?? null, fontWeight: bold ? 600 : null}}>
        <br contentEditable={false}/>
        {value.length !== 0 && "1" + value}
    </CellWrapper>

}

export default Cell;