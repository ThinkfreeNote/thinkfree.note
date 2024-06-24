/**
 * @property {string} value
 * @property {string} color
 * @property {string} bgColor
 * @property {boolean} bold
 * @property {"cell"} type
 */
export class Cell {
    constructor() {
        this.type = "cell";
        this.value = "";
        this.color = "black";
        this.bgColor = "";
        this.bold = false;
    }

    /**
     * @returns {string}
     */
    get text () {
        return this.value;
    }

    set text(value) {
        this.value = value;
    }

    updateBgColor(color){
        this.bgColor = color;
    }

    toggleBold() {
        this.bold = !this.bold;
    }

    set fontColor (color) {
        this.color = color;
    }
}