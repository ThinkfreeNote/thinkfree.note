export class Cell {
    constructor() {
        this.type = "cell";
        this.value = "";
        this.color = "black";
        this.bgColor = "";
        this.bold = false;
    }

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