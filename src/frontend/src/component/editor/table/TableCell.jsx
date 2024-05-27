import React from 'react';

function TableCell({data,cellId}) {
    if(data.length === 0) {
        return <td data-cell-id={cellId}>&#xFEFF;</td>
    }
    return (
        <td data-cell-id={cellId}>{data}</td>
    );
}

export default TableCell;