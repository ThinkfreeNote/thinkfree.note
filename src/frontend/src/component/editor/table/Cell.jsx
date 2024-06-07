import React, {useContext} from 'react';
import {useTableData} from "./hooks/useTableData";
import CellWrapper from "./CellWrapper";
import {TableCursorPositionContext} from "./contexts/TableSelectionProvider";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const {value, color, bgColor, bold} = useTableData().getCellValue(rowId, cellId);
    const isFunction = value.startsWith("=");
    const cellPosition = useContext(TableCursorPositionContext);

    const text = isFunction ? "Nan" : value;
    // key에 value를 줘서 value가 달라지면 처음부터 렌더링 하기 위함 (contenteditable의 br 충돌 문제 해결)
    return <CellWrapper key={value} cellId={cellId} rowId={rowId} colIdx={colIdx} rowIdx={rowIdx}
                        style={{color: color ?? null, backgroundColor: bgColor ?? null, fontWeight: bold ? 600 : null}} isSelected={cellPosition.rowId === rowId && cellPosition.cellId === cellId}>
        {text.length !== 0 ? (text) : <br/>}
    </CellWrapper>

}

export default Cell;