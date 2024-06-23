import {TextBlock} from "./TextBlock";
import {Block} from "./Block";

export class ContentsBlock extends Block {
    constructor(id, type, contents = {}) {
        super(id, type, contents);
    }
}