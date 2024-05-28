import React, {useContext, useEffect, useState} from 'react';
import TableRow from "./TableRow";
import {Table} from "../../../model/Table";
import useTable from "./hooks/useTable";
import {EditorContext} from "../NoteEditor";


function TableBlock({blockId}) {
    const [state, setState] = useState(0);
    const [data] = useTable({
        contentEditableRef : useContext(EditorContext),
        blockId : blockId
    });

    const addColumn = () => {
        if (data instanceof Table) {
            data.addColumn();
            setState(prev => prev + 1);
        }
    }
    const addRow = () => {
        if (data instanceof Table) {
            data.addRow();
            setState(prev => prev + 1);
        }
    }

    return (
        <div className={"table"}>
            <div style={{position: "relative"}}>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                    {data.contents.map(item => <TableRow key={item} data={data.rows[item]} format={data.format}/>)}
                    </tbody>
                </table>
                <button onClick={addColumn} contentEditable={false} className="btn_add btn_add_column">+</button>
                <button onClick={addRow} contentEditable={false} className="btn_add btn_add_row">+</button>
            </div>
        </div>
    );
}

export default TableBlock;

/*
테이블 목표
- 방향키로 셀 이동
- 열, 행 추가 삭제
*/