import {Calc, checkCalc} from "../../../../../utils/table";

/**
 * @desc 계산 함수 처리 훅
 * @param {Table} tableData
 */
export function useCalc(tableData) {

    /**
     * @param {string} text
     * @param {Set} visitedCells
     * @returns {string}
     */
    const calculate = (text, visitedCells) => {
        const calcType = checkCalc(text);
        // 계산함수 미적용 혹은 계산 함수가 아닌 경우
        if (calcType === Calc.NONE) {
            return (text.startsWith("=") && text.length > 1) ? "!계산식 오류" : text;
        }
        const {method, parameters} = parseCalculate(text, calcType);

        switch (calcType) {
            case Calc.METHOD : {
                return calculateByMethod(text, method, parameters, visitedCells);
            }
            case Calc.SIGN : {
                return calculateByMethod(text, method, parameters, visitedCells);
            }
            default : {
                return text;
            }
        }
    }


    /**
     * @param {string} text
     * @param {symbol} calcType
     * @returns {{method: string|string[], parameters : string[]}}}
     */
    const parseCalculate = (text, calcType) => {

        /** @example "=SUM(a1,a1)", "PRODUCT(a3,b4)" */
        if (calcType === Calc.METHOD) {
            const bracketStartIndex = text.indexOf("(");
            const bracketEndIndex = text.indexOf(")");

            const method = text.slice(1, bracketStartIndex);

            // 계산함수 파라미터 ( a1, a2, a3)
            const parameters = getParameterList(text.slice(bracketStartIndex + 1, bracketEndIndex));

            return {
                method,
                parameters
            }
        }
        /** @example "=1+2", "=a1+3" */
        else if (calcType === Calc.SIGN) {
            const calculation = text.slice(1).replace(" ", "");
            const parameters = calculation.split(/[*+-\/]/);
            const signs = calculation.split(/[a-zA-Z0-9]+/).filter((item) => item.length > 0);
            const method = signs.map(signToMethod);

            return {
                method,
                parameters
            }
        }
        return {
            method: "NONE",
            parameters: []
        }
    }

    /**
     * @param text
     * @returns {Array<string>}
     */
    const getParameterList = (text) => {
        return text.replace(" ", "").split(",")
    }

    /**
     * @desc 메서드 타입 계산함수 처리
     * @param {string} text
     * @param method
     * @param parameters
     * @param {Set} visitedCells
     * @example calculateByMethod("=SUM(a1,b2)")
     * @returns {string|symbol}
     */
    const calculateByMethod = (text, method, parameters, visitedCells) => {
        // 계산함수 파라미터 인덱스 변환 및 계산 값
        const parameterCellValues = parameters.map((param) => {
            // 인자가 숫자인 경우
            if (!isNaN(Number(param))) return Number(param);

            // 셀 번호인 경우 (a1, a2)
            const columnIdx = param.slice(0, 1).toLowerCase().charCodeAt(0) - 97;
            const rowIdx = Number(param.slice(1)) - 1;
            if (rowIdx === -1) {
                return NaN;
            }
            const value = getIndexOfValue(rowIdx, columnIdx, visitedCells);

            // 계산 과정에서 순환 참조가 발생한 경우
            if (value === Calc.CYCLE) {
                return Calc.CYCLE;
            }

            return isNaN(Number(value)) ? "!값 오류" : Number(value);
        })

        if (parameterCellValues.some(item => item === Calc.CYCLE)) {
            return "!순환 참조 수식";
        }

        if (method instanceof Array) {
            const methodList = [...method];
            const parameters = [...parameterCellValues];

            while (methodList.length !== 0) {
                let index = methodList.findIndex((method) => method === "PRODUCT" || method === "QUOTIENT");
                if (index === -1) {
                    index = methodList.findIndex((method) => method === "SUM" || method === "MINUS");
                }
                const [method] = methodList.splice(index, 1);
                const params = parameters.splice(index, 2);

                const result = calc(method, params);
                parameters.splice(index, 0, result);
            }

            return parameters[0];
        } else {
            // 메서드에 해당하는 계산 처리
            return calc(method, parameterCellValues);
        }

    }


    /** @return {string|symbol} 인덱스에 해당하는 셀의 값 획득 만약 계산함수라면 계산된 결과를 제공 */
    const getIndexOfValue = (rowIdx, colIdx, visitedCells) => {
        if (rowIdx >= tableData.rowSize || colIdx >= tableData.columnSize) return "";
        const rowId = tableData.contents[rowIdx];
        const columnId = tableData.format[colIdx];

        const cellIndex = `${rowIdx},${colIdx}`;
        if (visitedCells.has(cellIndex)) {
            return Calc.CYCLE;
        }
        visitedCells.add(cellIndex);

        const text = tableData.getRow(rowId).getCell(columnId).text.replaceAll(" ","");

        console.log(text);
        const result = calculate(text, visitedCells);
        visitedCells.delete(cellIndex);

        return result;
    }


    // 계산
    const calc = (methodType, parameters) => {
        const method = methodType.toUpperCase();
        let result = 0;

        if (method === "SUM") {
            result = parameters.reduce((acc, current) => {
                return acc + current
            }, 0)
        } else if (method === "AVERAGE") {
            result = parameters.reduce((acc, current) => {
                return acc + current
            }, 0) / parameters.length;
        } else if (method === "MINUS") {
            if (parameters.length !== 2) return "!인수 오류";
            result = parameters[0] - parameters[1];
        } else if (method === "PRODUCT") {
            result = parameters.reduce((acc, current) => {
                return acc * current;
            }, 1)
        } else if (method === "QUOTIENT") {
            if (parameters.length !== 2) return "!인수 오류";
            result = parameters[0] / parameters[1];
        } else {
            return "!메서드 오류"
        }

        if (isNaN(result)) return "!값 오류";

        return result;
    }


    const signToMethod = sign => {
        switch (sign) {
            case "+" : {
                return "SUM";
            }
            case "-" : {
                return "MINUS";
            }
            case "*" : {
                return "PRODUCT";
            }
            case "/" : {
                return "QUOTIENT";
            }
            default : {
                return "NONE"
            }
        }
    }

    return {calculate}
}
