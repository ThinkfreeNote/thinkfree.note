import {Block} from "../Block";
import {generate4wordId, getRandomId} from "../../utils/id";
import {isCell} from "../../utils/table";
import {Row} from "./Row";

/**
 * @property {Object} rows
 * @property {boolean} isRowHeader
 * @property {boolean} isColumnHeader
 * @property {Array} format
 * @property {Array} contents
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

    getRow (rowId) {
        return this.rows[rowId];
    }

    get rowSize() {
        return this.contents.length;
    }

    get columnSize() {
        return this.format.length;
    }

    addRow(index = Infinity) {
        const id = getRandomId();

        // 인덱스가 없거나 범위 초과라면 마지막에 추가
        if (index > this.contents.length) {
            this.contents.push(id);
        } else { // 전달된 인덱스 다음에 추가
            this.contents.splice(index + 1, 0, id);
        }

        this.rows[id] = new Row(this.format);
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

        rowIds.forEach(rowId => {
            this.getRow(rowId).setCell(columnId);
        })
    }

    addColumnFormat(columnId) {
        this.columnFormat[columnId] = {
            width: 100,
            color: "black",
        }
    }

    removeRow(rowIdx) {
        delete this.rows[this.contents[rowIdx]];
        this.contents.splice(rowIdx, 1);
    }

    removeColumn(colIdx) {
        const cellId = this.format[colIdx];
        this.contents.map(rowId => delete this.rows[rowId][cellId])
        const formatIndex = this.format.indexOf(cellId);
        this.format.splice(formatIndex, 1);
    }

    /**
     * @desc id 받아서 셀의 값 획득
     * @param {string} rowId
     * @param {string} colId
     * @param {boolean} isCalcMode 계산함수 적용 여부
     */
    getCellValue(rowId, colId, isCalcMode) {
        const { color, bgColor, bold} = this.getRow(rowId).getCell(colId);

        return {
            color,
            bgColor,
            bold
        };
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
        return this.contents[index - 1];
    }

    getNextRowId(rowId) {
        const index = this.contents.indexOf(rowId);
        return this.contents[index + 1];
    }

    getFirstCellOffset() {
        return [this.contents[0], this.format[0]];
    }
    getFirstBlockOffset() {
        return this.getFirstCellOffset();
    }
}