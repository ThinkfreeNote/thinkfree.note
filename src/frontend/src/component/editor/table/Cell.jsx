import React, {useContext, useMemo} from 'react';
import {useTableData} from "./hooks/useTableData";
import CellWrapper from "./CellWrapper";
import {TableCursorPositionContext} from "./contexts/TableSelectionProvider";
import {checkCalc, getCalcValue} from "../../../utils/table";


function Cell({cellId, rowId, colIdx, rowIdx}) {
    const tableData = useTableData();
    // 문서 모델에서 해당 Cell 의 id를 기반으로 값 가져오기
    const {value, color, bgColor, bold} = tableData.getCellValue(rowId, cellId);

    const style = useMemo(()=>{
        return {
            color,
            backgroundColor : bgColor,
            fontWeight : bold && 600,
        }
    },[color,bgColor,bold])

    // 현재 선택된 셀 id값 (해당 셀이 선택된 경우 표시하기 위함)
    const cellPosition = useContext(TableCursorPositionContext);
    const isSelected = cellPosition.rowId === rowId && cellPosition.cellId === cellId

    // 계산 함수 여부 value 값이 계산 함수 정규식을 만족하면 계산 함수에 맞게 렌더링
    const isValidCalc = !isSelected && checkCalc(value);

    const text = isValidCalc ?  getCalcValue(tableData,value) : value;

    // key에 value를 줘서 value가 달라지면 처음부터 렌더링 하기 위함 (contenteditable의 br 충돌 문제 해결)
    return <CellWrapper key={value} cellId={cellId} rowId={rowId} colIdx={colIdx} rowIdx={rowIdx}
                        style={style} isSelected={isSelected}>
        {text.length !== 0 ? text : <br/>}
    </CellWrapper>
}

export default Cell;