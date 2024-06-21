import {Cell} from "./Cell";

export class Row {
    constructor(format) {
        this.type = "row";
        this.initRow(format);
    }

    initRow(format) {
        format.forEach(item => {
            this[item] = new Cell();
        })
    }

    /**
     * @param columnId
     * @returns {Cell}
     */
    getCell(columnId) {
        return this[columnId];
    }

    setCell(columnId) {
        this[columnId] = new Cell();
    }
}