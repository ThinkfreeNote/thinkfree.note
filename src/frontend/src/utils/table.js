import {getBlockId} from "./editor";

/**
 * 셀 엘리먼트 받아서 해당하는 테이블 아이디들 반환
 * @param $cell cell 요소 (td)
 * @returns {{blockId: string, cellId: string, rowId: string}}
 */
export function getCellIds($cell) {
    return {
        blockId : getBlockId($cell),
        rowId : $cell.closest("[data-row-id]").dataset.rowId,
        cellId : $cell.dataset.cellId
    }
}

export function isCell($element) {
    return $element.tagName === "TD" && $element.dataset.cellId
}