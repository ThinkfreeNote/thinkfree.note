import {Block} from "./Block";
import {generate4wordId, getRandomId} from "../utils/id";
import {checkCalc, getCalcValue, isCell} from "../utils/table";

/**
 * @property {Array} format
 * @property {Object} rows
 * @property {boolean} isRowHeader
 * @property {boolean} isColumnHeader
 */
export class Table extends Block {
    constructor(id, type = "table", contents = []) {
        super(id, type, contents);
        this.format = [];
        this.columnFormat = {}
        this.isRowHeader = true;
        this.isColumnHeader = false;
        this.rows = {};
        this.init();
    }

    init(rowSize = 2, columnSize = 2) {
        for (let i = 0; i < columnSize; i++) {
            this.addColumn();
        }
        for (let i = 0; i < rowSize; i++) {
            this.addRow();
        }
    }

    addRow(index = Infinity) {
        const id = getRandomId();

        // 인덱스가 없거나 범위 초과라면 마지막에 추가
        if (index > this.contents.length) {
            this.contents.push(id);
        } else { // 전달된 인덱스 다음에 추가
            this.contents.splice(index + 1, 0, id);
        }

        const rowObj = {};
        this.format.forEach(item => {
            rowObj[item] = {
                value : "",
            };
        })

        this.rows[id] = rowObj;
    }

    addColumn(index = Infinity) {
        const columnId = generate4wordId();

        if (index > this.format.length) {
            this.format.push(columnId);
        } else {
            this.format.splice(index + 1, 0, columnId);
        }
        this.addColumnFormat(columnId);

        const rowIds = Object.keys(this.rows);

        rowIds.forEach(item => {
            this.rows[item][columnId] = {
                value : ""
            }
        })
    }

    addColumnFormat(columnId) {
        this.columnFormat[columnId] = {
            width: 100,
            color: "black",
        }
    }

    removeRow(index) {
        const rowId = this.contents[index];
        delete this.rows[rowId];
        this.contents.splice(index, 1);
    }

    removeColumn(index) {
        const cellId = this.format[index];
        this.contents.map(rowId => delete this.rows[rowId][cellId])
        const formatIndex = this.format.indexOf(cellId);
        this.format.splice(formatIndex, 1);

    }

    updateCell(rowId, colId, value) {
        this.rows[rowId][colId].value = value;
    }

    getCellValue(rowId, colId) {
        return this.rows[rowId][colId];
    }

    setCellColor(rowId,colId,color) {
        this.rows[rowId][colId].color = color;
    }
    toggleBold(rowId,colId) {
        this.rows[rowId][colId].bold = !this.rows[rowId][colId].bold ?? true;
    }

    setCellBackgroundColor(rowId,colId,color) {
        this.rows[rowId][colId].bgColor = color;
    }

    getFormat() {
        return this.format;
    }

    /**
     * @desc 테이블에서 셀의 위치 값
     * @param {HTMLElement} $cell
     * @returns {[number,number]}
     */
    getIndexOfCell($cell) {
        if (!isCell($cell)) return [-1, -1];
        const cellId = $cell.dataset.cellId;
        const rowId = $cell.closest("[data-row-id]").dataset.rowId;

        const rowIdx = this.contents.indexOf(rowId);
        const colIdx = this.format.indexOf(cellId);
        return [rowIdx, colIdx];
    }

    getRowLength() {
        return this.contents.length;
    }

    getColumnLength() {
        return this.format.length;
    }


    /**
     * @param {"column"|"row"} type
     * @returns {boolean}
     */
    getHeaderByType(type) {
        if (type === "row")
            return this.isRowHeader;
        if (type === "column")
            return this.isColumnHeader;
        return false;
    }

    toggleHeader(type) {
        if (type === "row") this.isRowHeader = !this.isRowHeader;
        if (type === "column") this.isColumnHeader = !this.isColumnHeader;
    }


    getColumnStyle(columnId) {
        return this.columnFormat[columnId];
    }

    setColumnWidth(columnId, number) {
        if (typeof number !== "number") return;
        const prevWidth = this.columnFormat[columnId].width;
        const nextWidth = prevWidth + number;
        this.columnFormat[columnId].width = nextWidth > 30 ? nextWidth : 30;
    }

    getPrevRowId(rowId) {
        const index = this.contents.indexOf(rowId);
        return this.contents[index-1];
    }
    getNextRowId(rowId) {
        const index = this.contents.indexOf(rowId);
        return this.contents[index+1];
    }

    getIndexOfValue(rowIdx,colIdx) {
        if(rowIdx >= this.contents.length || colIdx >= this.format.length) return null;
        const rowId = this.contents[rowIdx]
        const value = this.rows[rowId][this.format[colIdx]].value;

        if(checkCalc(value)) {
            return getCalcValue(this,value);
        }
        return value;
    }

    getFirstCellOffset() {
        return [this.contents[0],this.format[0]];
    }
}