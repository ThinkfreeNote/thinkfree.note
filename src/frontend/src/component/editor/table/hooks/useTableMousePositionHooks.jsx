import {useCallback, useContext} from "react";
import {TableSelectorContext, TableSelectorSetContext} from "../contexts/TableSelectorProvider";

/**
 * @desc 현재 마우스가 위치한 테이블 셀 위치 설정 훅
 * @returns {{clearPosition : function}}
 */
function useTableMousePositionSetter() {
    const {setCol, setRow} = useContext(TableSelectorSetContext);
    const clearPosition = () => {
        setCol(-1);
        setRow(-1);
    }

    const setMousePosition = useCallback((rowIdx, colIdx) => {
        setRow(rowIdx);
        setCol(colIdx);
    }, [])

    return {clearPosition, setMousePosition}
}

/**
 * @desc 현재 커서가 위치한 테이블 셀 위치 가져오는 훅
 * @warning 해당 훅 사용 시 마우스 이동마다 리렌더링 발생하기 때문에 테이블, row, cell 에서 직접 사용 주의
 * @returns {col : number, row : number}
 */
function useTableMousePosition() {
    const position = useContext(TableSelectorContext);

    return (position)
}

export {useTableMousePositionSetter, useTableMousePosition};