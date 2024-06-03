import {useEditorEventListener} from "../../hooks/useEditHandler";
import {useCallback, useContext} from "react";
import {getCellIds, isCell} from "../../../../utils/table";
import {removeBOM} from "../../../../utils/common";
import {useTableData} from "./useTableData";
import {BlockContext} from "../../BlockContextProvider";
import {editorSelection} from "../../../../App";

export function useTableHandlers() {
    const tableData = useTableData();
    const {blockId} = useContext(BlockContext);

    const cellHandler = useCallback((e) => {
        const $cell = editorSelection.getElement().startElement;
        if (!isCell($cell) || editorSelection.getClosestId("block").start !== blockId ) return;

        let value = $cell.textContent.length === 0 ? `\uFEFF` : removeBOM($cell.textContent);

        const {rowId, cellId} = getCellIds($cell);
        tableData.updateCell(rowId, cellId, value);
    }, [tableData])


    useEditorEventListener("input", cellHandler);

}
