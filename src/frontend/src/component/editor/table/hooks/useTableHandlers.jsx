import {useEditorEventListener} from "../../hooks/useEditHandler";
import {useCallback, useEffect} from "react";
import {getElementBySelection} from "../../../../utils/editor";
import {getCellIds, isCell} from "../../../../utils/table";
import {removeBOM} from "../../../../utils/common";
import {useTableData} from "./useTableData";
import {useBlockStore} from "../../hooks/useBlockHooks";

export function useTableHandlers() {
    const tableData = useTableData();
    const blockStore = useBlockStore();


    const cellHandler = useCallback((e) => {
        const $cell = getElementBySelection();
        if (!isCell($cell)) return;

        let value = $cell.textContent.length === 0 ? `\uFEFF` : removeBOM($cell.textContent);

        const {rowId, cellId} = getCellIds($cell);
        tableData.updateCell(rowId, cellId, value);
    }, [tableData])


    useEditorEventListener("input", cellHandler);

}
