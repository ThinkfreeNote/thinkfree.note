import {Block} from "./Block";

export class ListBlock extends Block {
    constructor(id, type, contents = {}, textBlockIdList = []) {
        super(id, type, contents);
        this.textBlockIdList = textBlockIdList;
    }
}