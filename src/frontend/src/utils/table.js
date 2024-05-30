import {getClosestBlockId} from "./editor";

/**
 * 셀 엘리먼트 받아서 해당하는 테이블 아이디들 반환
 * @param $cell cell 요소 (td)
 * @returns {{blockId: string, cellId: string, rowId: string}}
 */
export function getCellIds($cell) {
    return {
        blockId : getClosestBlockId($cell),
        rowId : $cell.closest("[data-row-id]").dataset.rowId,
        cellId : $cell.dataset.cellId
    }
}

/**
 * @desc 매개변수로 받은 요소가 셀인지 확인
 * @param $element
 * @returns {boolean}
 */
export function isCell($element) {
    if(!($element instanceof HTMLElement)) return false;
    return Boolean($element.dataset.cellId);
}