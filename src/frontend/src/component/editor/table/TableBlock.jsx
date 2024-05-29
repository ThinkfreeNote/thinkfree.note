import React from 'react';
import TableMousePositionProvider from "./contexts/TableSelectorProvider";
import TableComponent from "./TableComponent";
import TableMenu from "./TableMenu";
import TableMenuProvider from "./contexts/TableMenuContextProvider";
import {useBlockData} from "../hooks/useBlockHooks";

function TableBlock({blockId}) {
    // 테이블 데이터
    const tableData = useBlockData(blockId);

    return (
        <TableMousePositionProvider>
            <TableMenuProvider>
                <TableComponent data={tableData}/>
                <TableMenu/>
            </TableMenuProvider>
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