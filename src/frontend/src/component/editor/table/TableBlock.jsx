import React, {useContext, useEffect, useState} from 'react';
import {Table} from "../../../model/Table";

import useTable from "./hooks/useTable";
import TableSelectorProvider from "./contexts/TableSelectorProvider";
import TableComponent from "./TableComponent";
import TableMenu from "./TableMenu";
import TableMenuContextProvider from "./contexts/TableMenuContextProvider";


function TableBlock({blockId}) {
    const [data] = useTable(blockId);

    return (
        <TableSelectorProvider>
            <TableMenuContextProvider>
                <TableComponent data={data}/>
                <TableMenu/>
            </TableMenuContextProvider>
        </TableSelectorProvider>
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