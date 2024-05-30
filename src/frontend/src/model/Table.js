import {Block} from "./Block";
import {generate4wordId, getRandomId} from "../utils/id";
import {isCell} from "../utils/table";

/**
 * @property {Array} format
 * @property {Object} rows
 */
export class Table extends Block {
    constructor(id, type = "table", contents = []) {
        super(id, type, contents);
        this.format = [];
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
            rowObj[item] = "";
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

        const rowIds = Object.keys(this.rows);

        rowIds.forEach(item => {
            this.rows[item][columnId] = ""
        })
    }

    removeRow(index) {
        const rowId = this.contents[index];
        delete this.rows[rowId];
        this.contents.splice(index, 1);
    }
    removeColumn(index) {
        const cellId = this.format[index];
        this.contents.map(rowId => {
            delete this.rows[rowId][cellId];
        })
        const formatIndex = this.format.indexOf(cellId);
        this.format.splice(formatIndex,1);

    }

    updateCell(rowId, colId, value) {
        this.rows[rowId][colId] = value;
    }

    getCellValue(rowId, colId) {
        return this.rows[rowId][colId];
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
}