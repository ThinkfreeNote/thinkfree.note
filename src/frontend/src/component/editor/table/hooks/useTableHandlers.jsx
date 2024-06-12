import {useContext} from "react";
import {getCellIds, isCell} from "../../../../utils/table";
import {editorSelection} from "../../../../App";
import {MenuContext} from "../../../common/MenuContext";
import {useBlockStore} from "../../hooks/useBlockHooks";

export function useTableHandlers() {
    const blockStore = useBlockStore();
    const {offset} = useContext(MenuContext);

    const cellInputHandler = (e) => {
        // 현재 커서가 셀에 있는지 확인
        const $cell = editorSelection.getElement().startElement;
        if (!isCell($cell)) return;

        // 커서 위치에 맞는 테이블 모델 획득
        const tableData = blockStore.getBlock(editorSelection.blockId[0]);
        
        // 변경된 값 획득
        const value = editorSelection.getStartNode().textContent;
        if (value === undefined || value === null) return;

        // 테이블 모델 업데이트
        const {rowId, cellId} = getCellIds($cell);
        tableData.updateCell(rowId, cellId, value);
    }


    const arrowKey = (e) => {
        if (offset.x !== 0 && offset.y !== 0) return;
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            if (editorSelection.isNullSelection()) return;
            const $cell = editorSelection.getElement().startElement;
            if (isCell($cell)) {
                const blockId = editorSelection.blockId[0];
                const tableData = blockStore.getBlock(blockId);
                e.preventDefault();
                const {rowId, cellId} = getCellIds($cell);

                const prevRowId = e.key === "ArrowUp" ? tableData.getPrevRowId(rowId) : tableData.getNextRowId(rowId);
                if (!prevRowId) return;
                const $block = document.querySelector(`[data-block-id="${blockId}"]`);

                const targetCell = $block.querySelector(`[data-row-id="${prevRowId}"]`).querySelector(`[data-cell-id="${cellId}"]`);
                editorSelection.setCaret(targetCell, 0);
            }
        }
        
    }


    const keyDownHandler = (e) => {
        // 화살표 키 입력 이벤트 처리
        e.key.startsWith("Arrow") && arrowKey(e);
    }


    const inputHandler = (e) => {
        cellInputHandler(e);
    }

    return {keyDownHandler, inputHandler}
}
