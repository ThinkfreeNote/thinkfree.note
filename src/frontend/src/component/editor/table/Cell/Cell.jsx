import React from 'react';
import {useTableData} from "../hooks/useTableData";
import CellWrapper from "./CellWrapper";
import {useTableCursorPosition} from "../contexts/TableSelectionProvider";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const tableData = useTableData();

    // 현재 입력중인 셀인지 확인
    const {isSelected} = useTableCursorPosition(rowId,cellId);

    // 모델에서 셀 value 로드 (계산함수 처리 포함, 입력 중이라면 계산함수 적용 X)
    const {value,originValue} = tableData.getCellValue(rowId, cellId,!isSelected);

    return <CellWrapper key={originValue} cellId={cellId} rowId={rowId} colIdx={colIdx} rowIdx={rowIdx}
                        isSelected={isSelected}>
        {value.length !== 0 ? value : <br/>}
    </CellWrapper>
}

export default Cell;