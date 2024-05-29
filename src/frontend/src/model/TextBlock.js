import {Block} from "./Block";

export class TextBlock extends Block {
    constructor(id, type, contents = {}) {
        super(id, type, contents);
    }

    addText(text) {
        this.contents[text.id] = text;
    }
}