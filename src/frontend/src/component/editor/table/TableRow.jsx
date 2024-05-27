import React, {useEffect} from 'react';
import TableCell from "./TableCell";

function TableRow({data,format}) {
    return (
        <tr>
            {format.map(item => {
                return <TableCell key={item} data={data[item]}/>
            })}
        </tr>
    );
}

export default TableRow;