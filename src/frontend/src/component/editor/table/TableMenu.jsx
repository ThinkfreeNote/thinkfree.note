import React, {useContext} from 'react';
import {ContextMenu} from "../../common/ContextMenu";
import {BlockIdContext} from "../BlockWrapper";
import {useBlockData} from "../hooks/useBlockHooks";
import useTable from "./hooks/useTable";
import {TableRerenderContext} from "./TableComponent";

function TableMenu({closeMenu, type, rowIdx, colIdx}) {
    const headerAble = rowIdx === 0 && colIdx === 0;
    const typeText = type === "row" ? "행" : "열";
    const blockId = useContext(BlockIdContext);
    const tableData = useBlockData(blockId);
    const {addRow,addColumn,removeRow} = useTable(tableData);
    const reRenderTable = useContext(TableRerenderContext);

    const insertNext = () => {
        if(type === "row") {
            addRow(rowIdx);
            reRenderTable();
        }
        else if(type === "col") {
            addColumn(colIdx);
            reRenderTable();
        }
        closeMenu();
    }
    const insertPrev = () => {
        if(type === "row") {
            addRow(rowIdx-1);
            reRenderTable();
        }
        else if(type === "col") {
            addColumn(colIdx-1);
            reRenderTable();
        }
        closeMenu();
    }

    const remove = () => {
        if(type === "row") {
            removeRow(rowIdx);
            reRenderTable();
        }
    }

    return (
        <ContextMenu closeMenu={closeMenu}>
            {headerAble && (
                <>
                    <ContextMenu.Toggle name={`헤더 ${typeText}`}/>
                    <ContextMenu.Divider/>
                </>
            )}
            <ContextMenu.Plain name={`이전에 ${typeText} 삽입`} handler={insertPrev}/>
            <ContextMenu.Plain name={`다음에 ${typeText} 삽입`} handler={insertNext}/>
            <ContextMenu.Plain name={`${typeText} 삭제`} handler={remove}/>
            <ContextMenu.Plain name="계산 함수"/>
        </ContextMenu>
    )
}

export default TableMenu;