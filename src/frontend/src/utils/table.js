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


export function checkCalc(text) {
    // = 으로 시작하고, 영문자 반복 + 괄호 안에 문자1+숫자n+쉼표 가 여러개 , 마지막은 쉼표 없이 문자1+숫자n
    const regex = /^=[a-zA-Z]*\(([a-zA-Z]\d+,)*([a-zA-Z]\d+)\)$/;

    return regex.test(text)
}

export function getCalcMethod(text) {
    const bracketStartIndex = text.indexOf("(");

    return text.slice(1, bracketStartIndex);
}

export function getCalcParams(text) {
    const bracketStartIndex = text.indexOf("(");
    const bracketEndIndex = text.indexOf(")");

    return text.slice(bracketStartIndex + 1, bracketEndIndex).replace(" ", "").split(",");
}

export function getCalcValue(table, text) {
    let method = getCalcMethod(text);
    const params = getCalcParams(text);
    const values = params.map((item, idx) => {
        const alphabet = item.slice(0, 1).toLowerCase();
        const number = item.slice(1);

        return Number(table.getIndexOfValue(Number(number) - 1, alphabet.charCodeAt(0) - 97));
    })

    let result = 0;
    method = method.toUpperCase();

    if (method === "SUM") {
        result = values.reduce((acc, current) => {
            return acc + current
        }, 0)
    } else if (method === "AVERAGE") {
        result = values.reduce((acc, current) => {
            return acc + current
        }, 0) / values.length;
    } else if (method === "MINUS") {
        if (values.length !== 2) return "!인수 오류";
        result = values[0] - values[1];
    } else if (method === "PRODUCT") {
        result = values.reduce((acc, current) => {
            return acc * current;
        }, 1)
    }
    else if(method === "QUOTIENT"){
        if(values.length !== 2) return "!인수 오류";
        result = values[0] / values[1];
    }
    else {
        return "!메서드 오류"
    }

    if (isNaN(result)) return "!계산 오류";

    return result;
}