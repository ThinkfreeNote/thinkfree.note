import React from 'react';
import TableSelector from "./TableSelector";
import {useTableMousePositionSetter} from "./hooks/useTableMousePositionHooks";


function TableCell({data, cellId, colIdx, rowIdx}) {
    const {setMouseColPosition} = useTableMousePositionSetter();

    const mouseHandler = (e) => {
        // 현재 마우스가 위치한 Column 위치 업데이트
        setMouseColPosition(colIdx);
    }

    return (
        <td data-cell-id={cellId} className="cell" onMouseOver={mouseHandler}>
            <TableSelector colIdx={colIdx} rowIdx={rowIdx}/>
            {data.length === 0 ? `\uFEFF` : data}</td>
    );
}
export default TableCell;