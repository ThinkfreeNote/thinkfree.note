import {useContext} from "react";
import {getCellIds, isCell} from "../../../../utils/table";
import {editorSelection} from "../../../../App";
import {MenuContext} from "../../../common/MenuContext";
import {useBlockStore} from "../../hooks/useBlockHooks";

/**
 * @desc 테이블 모델 메서드를 호출하는 함수들을 모아두는 커스텀 훅
 * @returns {{updateCellValue: function, tableArrowHandler: function}}
 */
export function useTableHandler() {
    const blockStore = useBlockStore();
    const {offset} = useContext(MenuContext);

    /**
     *  @desc 입력 값을 가져와서 테이블 모델을 업데이트 하는 함수
     */
    const updateCellValue = () => {
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

    /**
     * @dsec 화살표 키 입력을 받아서 테이블에서 현재 입력중인 셀을 변경하는 함수
     * @param {KeyboardEvent} e
     */
    const tableArrowHandler = (e) => {
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

    return {tableArrowHandler, updateCellValue}
}
