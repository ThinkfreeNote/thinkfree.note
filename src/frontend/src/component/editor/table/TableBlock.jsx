import React from 'react';
import TableMousePositionProvider from "./contexts/TableSelectorProvider";
import {useTableHandlers} from "./hooks/useTableHandlers";
import Table from "./Table";

function TableBlock() {
    useTableHandlers();

    return (
        <TableMousePositionProvider>
            <Table/>
        </TableMousePositionProvider>
    );
}

export default TableBlock;

/*
테이블 목표
- 방향키로 셀 이동
- 열, 행 추가 삭제
- 셀 사이즈 조절
- 셀 선택
*/