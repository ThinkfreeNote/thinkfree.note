import React from 'react';

function TableCell({data}) {
    if(data.length === 0) {
        return <td>&#xFEFF;</td>
    }
    return (
        <td>{data}</td>
    );
}

export default TableCell;