import {useCallback, useState} from 'react';
import {getCellIds, isCell} from "../../../../utils/table";
import {removeBOM} from "../../../../utils/common";
import {getElementBySelection} from "../../../../utils/editor";

/**
 * @desc 테이블 핸들러 반환하는 커스텀 훅
 * @param {Table} tableBlock
 * @returns {{inputHandler: ((function(*): void)|*)}}
 */
function useTable(tableBlock) {
    // 리렌더링 발생 목적
    const [_, setNum] = useState(0);

    const tableRerender = () => {
        setNum(prev => prev + 1);
    }

    const cellHandler = useCallback((e) => {
        const $cell = getElementBySelection();
        if (!isCell($cell)) return;
        let value = $cell.textContent.length === 0 ? `\uFEFF` : removeBOM($cell.textContent);

        const {rowId, cellId} = getCellIds($cell);
        tableBlock.updateCell(rowId, cellId, value);
    }, [tableBlock])

    const addColumn = () => {
        tableBlock.addColumn();
        tableRerender();
    }

    const addRow = () => {
        tableBlock.addRow();
        tableRerender();
    }

    return {cellHandler, addColumn, addRow, tableRerender}
}

export default useTable;