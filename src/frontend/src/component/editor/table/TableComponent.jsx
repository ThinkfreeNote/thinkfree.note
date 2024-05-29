import React from 'react';
import TableRow from "./TableRow";
import useTable from "./hooks/useTable";
import {useTableMousePositionSetter} from "./hooks/useTableMousePositionHooks";
import {useEditorEventListener} from "../hooks/useEditHandler";

function TableComponent({data}) {
    const {addColumn, addRow} = useTable(data);
    const {clearPosition} = useTableMousePositionSetter();

    // 에디터에 테이블 조작 핸들러 등록
    const {cellHandler} = useTable(data);
    useEditorEventListener("input",cellHandler,[cellHandler]);

    const mouseOutHandler =  (e) => {
        clearPosition();
    }

    return (
        <div className={"table"} onMouseOut={mouseOutHandler}>
            <div style={{position: "relative"}}>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                    {data.contents.map((item, idx) => <TableRow key={item} data={data.rows[item]} rowId={item}
                                                                format={data.format} rowIdx={idx}/>)}
                    </tbody>
                </table>
                <button onClick={addColumn} contentEditable={false} className="btn_add btn_add_column">+</button>
                <button onClick={addRow} contentEditable={false} className="btn_add btn_add_row">+</button>
            </div>
        </div>
    );
}

export default TableComponent;