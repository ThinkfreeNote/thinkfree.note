import Row from "./Row";
import React from "react";
import TableWrapper from "./TableWrapper";
import {useTableData} from "./hooks/useTableData";
import Colgroup from "./Colgroup";
import ColgroupProvider from "./contexts/ColgroupProvider";

function Table() {
    // 문서 모델에서 가져온 테이블 데이터
    const tableData = useTableData();
    return (
        <ColgroupProvider>
            {/* 테이블 요소를 감싸는 요소들 */}
            <TableWrapper>
                <table style={{ display:"table"}}>
                    <Colgroup/>
                    <tbody>
                    {/* 테이블 객체 속 contents */}
                    {tableData.contents.map((rowId, idx) => <Row key={rowId} rowId={rowId} rowIdx={idx}/>)}
                    </tbody>
                </table>
            </TableWrapper>
        </ColgroupProvider>
    )
}

export default React.memo(Table);