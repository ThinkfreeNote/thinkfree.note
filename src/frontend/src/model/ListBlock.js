import {TextBlock} from "./TextBlock";

export class ListBlock extends TextBlock {
    constructor(id, type, contents = {}, parentId = "", childIdList = [], depth = 0) {
        super(id, type, contents);
        this.parentId = parentId;
        this.childIdList = childIdList;
        this.depth = depth;
    }

    moveChild(childListBlock) {
        childListBlock.parentId = this.id;
        this.childIdList.push(childListBlock.id);
    }
}