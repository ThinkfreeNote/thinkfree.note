import {TextBlock} from "../text/TextBlock";

export class QuoteBlock extends TextBlock {
    constructor(id, type, contents = {}) {
        super(id, type, contents);
    }
}