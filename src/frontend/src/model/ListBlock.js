import {TextBlock} from "./TextBlock";

export class ListBlock extends TextBlock {
    constructor(id, type, contents = {}, childIdList = []) {
        super(id, type, contents);
        this.childIdList = childIdList;
    }
}