import {TextBlock} from "./TextBlock";

export class ListBlock extends TextBlock {
    constructor(id, type, contents = {}, parentId = "", childIdList = [], depth = 0) {
        super(id, type, contents);
        this.parentId = parentId;
        this.childIdList = childIdList;
        this.depth = depth;
    }

    getChildIndex(childBlockId) {
        return this.childIdList.indexOf(childBlockId);
    }

    getPrevChildBlockId(childBlockId) {
        const curIdx = this.getChildIndex(childBlockId);
        if (curIdx <= 0) return null;
        return this.childIdList[curIdx - 1];
    }

    //
    // moveChild(childListBlock) {
    //     childListBlock.parentId = this.id;
    //     this.childIdList.push(childListBlock.id);
    // }
}