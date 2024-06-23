import {TextBlock} from "./TextBlock";

export class HeadBlock extends TextBlock {
    constructor(id, type, contents = {}, level = 1) {
        super(id, type, contents);
        this.level = level;
    }
}