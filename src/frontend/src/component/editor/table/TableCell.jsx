import React, {useContext} from 'react';
import TableSelector from "./TableSelector";
import {TableSelectorSetContext} from "./contexts/TableSelectorProvider";


function TableCell({data, cellId, colIdx, rowIdx}) {
    const {setCol} = useContext(TableSelectorSetContext);

    const mouseHandler = (e) => {
        setCol(colIdx);
    }

    return (
        <td data-cell-id={cellId} className="cell" onMouseOver={mouseHandler}>
            <TableSelector colIdx={colIdx} rowIdx={rowIdx}/>
            {data.length === 0 ? `\uFEFF` : data}</td>
    );
}
export default TableCell;