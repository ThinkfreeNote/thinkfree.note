import {Block} from "./Block";
import {generate4wordId, getRandomId} from "../utils/id";

export class Table extends Block {
    constructor(id, type, contents) {
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

    addColumn() {
        const columnId = generate4wordId();
        this.format.push(columnId);

        const rowIds = Object.keys(this.rows);

        rowIds.forEach(item => {
            this.rows[item][columnId] = ""
        })
    }
}