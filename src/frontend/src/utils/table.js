/**
 * @enum {{METHOD : Symbol, SIGN : Symbol, NONE : Symbol}}
 */
export const Calc = Object.freeze({
    METHOD : Symbol("METHOD"),
    SIGN : Symbol("SIGN"),
    NONE : Symbol("NONE"),
    CYCLE : Symbol("CYCLE"),
})

/**
 * 셀 엘리먼트 받아서 해당하는 테이블 아이디들 반환
 * @param $cell cell 요소 (td)
 * @returns {{blockId: string, cellId: string, rowId: string}}
 */
export function getCellIds($cell) {
    return {
        blockId: $cell.closest("[data-block-id]").dataset.blockId,
        rowId: $cell.closest("[data-row-id]").dataset.rowId,
        cellId: $cell.dataset.cellId
    }
}

/**
 * @desc 매개변수로 받은 요소가 셀인지 확인
 * @param $element
 * @returns {boolean}
 */
export function isCell($element) {
    if (!($element instanceof HTMLElement)) return false;
    return Boolean($element.dataset.cellId);
}


/**
 * @param text
 * @returns {symbol} calcType
 */
export function checkCalc(text) {
    // = 으로 시작하고, 영문자 반복 + 괄호 안에 문자1+숫자n+쉼표 가 여러개 , 마지막은 쉼표 없이 문자1+숫자n
    const regex = /^=[a-zA-Z]*\(([a-zA-Z]\d+,)*([a-zA-Z]\d+)\)$/;

    // = 으로 시작하고 +, - / * 기호를 이용
    const regex2 = /^=(([0-9]|[a-zA-Z]\d)+[+-/*])*([0-9]|[a-zA-Z]\d)+$/;
    // const regex2 = /^=([a-zA-Z0-9]+[+-/*])*[a-zA-Z0-9]+$/;

    if(regex.test(text)) return Calc.METHOD
    else if(regex2.test(text)) return Calc.SIGN
    return Calc.NONE;
}
