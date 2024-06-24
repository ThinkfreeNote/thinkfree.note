import React from 'react';
import {ContextMenu} from "../../ui/menu/ContextMenu";
import useTable from "./hooks/useTable";
import {useTableData} from "./hooks/useTableData";

import {ReactComponent as LineArrowRightIcon} from "../../../assets/icon_lineArrow_right.svg";
import {ReactComponent as LineArrowDownIcon} from "../../../assets/icon_lineArrow_down.svg";
import {ReactComponent as LineArrowUpIcon} from "../../../assets/icon_lineArrow_up.svg";
import {ReactComponent as LineArrowLeftIcon} from "../../../assets/icon_lineArrow_left.svg";
import {ReactComponent as TableHeaderIcon} from "../../../assets/icon_table_header.svg";
import {ReactComponent as DeleteIcon} from "../../../assets/icon_delete.svg";

const convertTypeToText = (type) => {
    return type === "row" ? "행" : "열";
}

const getTextByDirection = (type, direction) => {
    if (type === "row") {
        return direction === "prev" ? "위로" : "아래로";
    } else {
        return direction === "next" ? "오른쪽에" : "왼쪽에"
    }
}

/**
 * @desc 테이블 메뉴
 * @param {function} closeMenu
 * @param {"row"|"column"} type
 * @param {number} rowIdx
 * @param {number} colIdx
 * @returns {JSX.Element}
 */
function TableMenu({closeMenu, type, rowIdx, colIdx}) {
    const headerAble = rowIdx === 0 && colIdx === 0;
    const tableData = useTableData();
    const deleteAble = type === "row" ? tableData.rowSize > 1 : tableData.columnSize > 1;
    const {addRow, addColumn, removeRow, removeColumn,toggleHeader} = useTable();

    // 다음에 삽입
    const insertNextMenuHandler = () => {
        type === "row" ? addRow(rowIdx) : addColumn(colIdx);
        closeMenu();
    }
    // 이전에 삽입
    const insertPrevMenuHandler = () => {
        type === "row" ? addRow(rowIdx - 1) : addColumn(colIdx - 1);
        closeMenu();
    }
    // 삭제
    const removeMenuHandler = () => {
        type === "row" ? removeRow(rowIdx) : removeColumn(colIdx);
        closeMenu();
    }

    const headerMenuHandler = () => {
        toggleHeader(type);
        closeMenu();
    }

    return (
        <ContextMenu closeMenu={closeMenu}>
            <ContextMenu.SubTitle text="테이블 메뉴"/>
            <ContextMenu.Divider/>
            {headerAble && (
                <>
                    <ContextMenu.Toggle icon={<TableHeaderIcon/>} name={`${convertTypeToText(type)} 헤더 `} handler={headerMenuHandler} init={tableData.getHeaderByType(type)} />
                    <ContextMenu.Divider/>
                </>
            )}
            <ContextMenu.Plain icon={type === "row" ? <LineArrowUpIcon/> : <LineArrowLeftIcon/> } name={`${getTextByDirection(type, "prev")} ${convertTypeToText(type)} 삽입`}
                               handler={insertPrevMenuHandler}/>
            <ContextMenu.Plain icon={type === "row" ? <LineArrowDownIcon/> : <LineArrowRightIcon/> } name={`${getTextByDirection(type, "next")} ${convertTypeToText(type)} 삽입`}
                               handler={insertNextMenuHandler}/>
            <ContextMenu.Plain icon={<DeleteIcon/>} disable={!deleteAble} name={`${convertTypeToText(type)} 삭제`}
                               handler={removeMenuHandler}/>

        </ContextMenu>
    )
}

export default TableMenu;