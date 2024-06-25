import {TextBlock} from "../text/TextBlock";

export class ListBlock extends TextBlock {
    constructor(id, type, contents = {}, parentId = "", childIdList = [], depth = 0, isChecked = false) {
        super(id, type, contents);
        this.parentId = parentId;
        this.childIdList = childIdList;
        this.depth = depth;
        this.isChecked = isChecked;
    }

    getChildIndex(childBlockId) {
        return this.childIdList.indexOf(childBlockId);
    }

    getPrevChildBlockId(childBlockId) {
        const curIdx = this.getChildIndex(childBlockId);
        if (curIdx <= 0) return null;
        return this.childIdList[curIdx - 1];
    }

    removeChild(childBlockId) {
        const index = this.getChildIndex(childBlockId);
        if (index === -1) return false;
        this.childIdList.splice(index, 1);
        return true;
    }
}