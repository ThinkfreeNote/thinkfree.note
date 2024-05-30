import React, {useContext} from 'react';
import Row from "./Row";
import useTable from "./hooks/useTable";
import {useTableMousePositionSetter} from "./hooks/useTableMousePositionHooks";
import {BlockIdContext} from "../BlockWrapper";
import {useBlockData} from "../hooks/useBlockHooks";
import {isCell} from "../../../utils/table";

function TableComponent() {
    const {blockId} = useContext(BlockIdContext);
    const tableData = useBlockData(blockId);

    const {addColumn, addRow} = useTable(tableData);
    const {clearPosition, setMousePosition} = useTableMousePositionSetter();

    const mouseLeaveHandler = () => {
        clearPosition();
    }

    const mouseMove = (e) => {
        const target = e.target;
        const $cell = isCell(target) ? target : (isCell(e.target.closest("[data-row-id]")) ?? null);
        if (!$cell) return;

        const [rowIdx,colIdx] = tableData.getIndexOfCell($cell);
        setMousePosition(rowIdx, colIdx);
    }

    return (
        <div className="table-block" onMouseLeave={mouseLeaveHandler}>
            <div className="table-box" onMouseMove={mouseMove}>
                <Table tableData={tableData}/>
                <button onClick={() => addColumn()} contentEditable={false} className="btn_add btn_add_column">+
                </button>
                <button onClick={() => addRow()} contentEditable={false} className="btn_add btn_add_row">+</button>
            </div>
        </div>
    );
}

function Table({tableData}) {
    return (
        <table>
            <thead>
            </thead>
            <colgroup>
            </colgroup>
            <tbody>
                {tableData.contents.map((rowId, idx) => <Row key={rowId} rowId={rowId} rowIdx={idx}/>)}
            </tbody>
        </table>
    )
}

export default TableComponent;