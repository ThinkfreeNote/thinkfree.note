import Row from "./Row";
import React from "react";
import TableWrapper from "./TableWrapper";
import {useTableData} from "./hooks/useTableData";
import Colgroup from "./Colgroup";
import ColgroupProvider from "./contexts/ColgroupProvider";

function Table() {
    const tableData = useTableData();
    return (
        <ColgroupProvider>
            <TableWrapper>
                <table style={{ display:"table"}}>
                    <Colgroup/>
                    <tbody>
                    {tableData.contents.map((rowId, idx) => <Row key={rowId} rowId={rowId} rowIdx={idx}/>)}
                    </tbody>
                </table>
            </TableWrapper>
        </ColgroupProvider>
    )
}

export default React.memo(Table);