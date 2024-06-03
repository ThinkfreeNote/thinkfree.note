import {Block} from "./Block";

export class TextBlock extends Block {
    constructor(id, type, contents = {}, textIdList = []) {
        super(id, type, contents);
        this.textIdList = textIdList;
    }

    addText(text) {
        this.contents[text.id] = text;
        this.textIdList.push(text.id);
    }

    updateTextValue(textId, value) {
        this.contents[textId] = value;
    }

    getText(textId) {
        return this.contents[textId];
    }
}