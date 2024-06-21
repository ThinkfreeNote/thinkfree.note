import React from 'react';
import Cell from "../Cell/Cell";
import {useTableData} from "../hooks/useTableData";
import RowWrapper from "./RowWrapper";

function Row({rowId, rowIdx}) {
    const tableData = useTableData();

    return (
        <RowWrapper rowIdx={rowIdx} rowId={rowId}>
            {/* format 배열을 반복하며 Cell 추가 */}
            {tableData.format.map((cellId, idx) => {
                return (<Cell key={cellId} rowId={rowId} cellId={cellId} colIdx={idx} rowIdx={rowIdx}/>)
            })}
        </RowWrapper>
    );
}

export default Row;