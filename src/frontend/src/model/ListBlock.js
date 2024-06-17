import {TextBlock} from "./TextBlock";

export class ListBlock extends TextBlock {
    constructor(id, type, contents = {}, textIdList = [], listContents = {}, listIdList = []) {
        super(id, type, contents, textIdList);
        this.listContents = listContents;
        this.listIdList = listIdList;
    }
}