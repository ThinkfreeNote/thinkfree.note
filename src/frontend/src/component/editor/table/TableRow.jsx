import React, {useEffect} from 'react';
import TableCell from "./TableCell";

function TableRow({data,format,rowId}) {
    return (
        <tr data-row-id={rowId}>
            {format.map(item => {
                return <TableCell key={item} data={data[item]} cellId={item}/>
            })}
        </tr>
    );
}

export default TableRow;