import {Block} from "./Block";

export class ListBlock extends Block {
    constructor(id, type, contents = {}, textBlockIdList = [], depthList = []) {
        super(id, type, contents);
        this.textBlockIdList = textBlockIdList;
        this.depthList = depthList;
    }

    pushTextBlockId(textBlockId = null , depth = 0) {
        this.textBlockIdList.push(textBlockId);
        this.depthList.push(depth);
    }
}