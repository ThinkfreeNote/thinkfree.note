import React from 'react';
import TableCell from "./TableCell";
import {useTableMousePositionSetter} from "./hooks/useTableMousePositionHooks";

function TableRow({data,format,rowId, rowIdx}) {
    const {setMouseRowPosition} = useTableMousePositionSetter();

    const mouseOverHandler = (e)=> {
        // 현재 마우스가 위치한 row 위치 업데이트
        setMouseRowPosition(rowIdx);
    }

    return (
        <tr onMouseOver={mouseOverHandler} data-row-id={rowId}>
            {format.map((item,idx) => {
                return <TableCell key={item} data={data[item]} cellId={item} colIdx={idx} rowIdx={rowIdx}/>
            })}
        </tr>
    );
}

export default TableRow;