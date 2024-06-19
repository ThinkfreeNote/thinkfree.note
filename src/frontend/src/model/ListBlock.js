import {TextBlock} from "./TextBlock";

export class ListBlock extends TextBlock {
    constructor(id, type, contents = {}, childIdList = [], depth = 0) {
        super(id, type, contents);
        this.childIdList = childIdList;
        this.depth = depth;
    }

    moveChild(listBlockId) {
        this.childIdList.push(listBlockId);
    }
}