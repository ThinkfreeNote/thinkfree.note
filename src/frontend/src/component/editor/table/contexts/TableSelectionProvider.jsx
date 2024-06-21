import React, {createContext, useContext, useEffect, useState} from "react";
import {editorSelection} from "../../../../App";
import {getCellIds} from "../../../../utils/table";

export const TableCursorPositionContext = createContext(null);


/**
 * @desc 테이블에서 현재 캐럿(셀렉션)이 위치한 셀의 rowId와 colId 반환
 * @param blockId
 * @param children
 * @returns {JSX.Element} Conetext.Provider
 * @constructor
 */
function TableCursorPositionProvider({blockId, children}) {
    const [rowId, setRowId] = useState(null);
    const [cellId, setCellId] = useState(null)

    useEffect(() => {
        const clearPosition = () => {
            setRowId(null);
            setCellId(null);
        }

        const handler = () => {
            // null이거나 blockId와 현재 셀렉션의 blockId가 다른경우
            if (editorSelection.isNullSelection() || editorSelection.getClosestId("block").start !== blockId) {
                clearPosition();
                return;
            }
            const $cell = editorSelection.getClosestElement("cell").start;
            if (!$cell) {
                clearPosition();
                return;
            }

            const {rowId,cellId} = getCellIds($cell);
            setRowId(rowId);
            setCellId(cellId);

        }
        document.addEventListener("selectionchange", handler)
        return () => {
            document.removeEventListener("selectionchange", handler);
        }
    }, [blockId]);

    return <TableCursorPositionContext.Provider value={{rowId, cellId}}>
        {children}
    </TableCursorPositionContext.Provider>

}

export function useTableCursorPosition(rowId,columnId) {
    const cellPosition = useContext(TableCursorPositionContext);

    const isSelected = cellPosition.rowId === rowId && cellPosition.cellId === columnId;

    return {isSelected}
}

export default React.memo(TableCursorPositionProvider);