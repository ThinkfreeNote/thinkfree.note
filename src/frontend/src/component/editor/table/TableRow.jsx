import React, {useContext} from 'react';
import TableCell from "./TableCell";
import {TableSelectorSetContext} from "./contexts/TableSelectorProvider";

function TableRow({data,format,rowId, rowIdx}) {
    const {setRow} = useContext(TableSelectorSetContext);

    const mouseOverHandler = (e)=> {
        setRow(rowIdx);
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