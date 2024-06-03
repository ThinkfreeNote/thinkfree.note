import {useEditorEventListener} from "../../hooks/useEditHandler";
import {useCallback, useContext} from "react";
import {getClosestBlockId, getElementBySelection} from "../../../../utils/editor";
import {getCellIds, isCell} from "../../../../utils/table";
import {removeBOM} from "../../../../utils/common";
import {useTableData} from "./useTableData";
import {BlockContext} from "../../BlockContextProvider";

export function useTableHandlers() {
    const tableData = useTableData();
    const {blockId} = useContext(BlockContext);

    const cellHandler = useCallback((e) => {
        const $cell = getElementBySelection();
        if (!isCell($cell) || getClosestBlockId($cell) !== blockId ) return;

        let value = $cell.textContent.length === 0 ? `\uFEFF` : removeBOM($cell.textContent);

        const {rowId, cellId} = getCellIds($cell);
        tableData.updateCell(rowId, cellId, value);
    }, [tableData])


    useEditorEventListener("input", cellHandler);

}
