import {Table} from "../model/Table/Table";
import {TextBlock} from "../model/TextBlock";
import {FontStyle} from "../model/FontStyle";
import {BlockStore} from "../model/BlockStore";
import {Row} from "../model/Table/Row";
import {Cell} from "../model/Table/Cell";
import {ListBlock} from "../model/ListBlock";
import {HeadBlock} from "../model/HeadBlock";
import {ContentsBlock} from "../model/ContentsBlock";

/**
 * @desc 저장된 json 문서 파싱하여 모델객체로 연결
 * @param jsonText
 * @returns {any}
 */
export function jsonToBlockStore(jsonText) {
    return JSON.parse(jsonText, (key, value) => {
        if (value.type === "table") return Object.setPrototypeOf(value, Table.prototype);
        if (value.type === "text") return Object.setPrototypeOf(value, TextBlock.prototype);
        if (value.type === "ul" || value.type === "ol") Object.setPrototypeOf(value, ListBlock.prototype);
        if (value.type === "head") Object.setPrototypeOf(value, HeadBlock.prototype);
        if (value.type === "contents") Object.setPrototypeOf(value, ContentsBlock.prototype);
        if (Object.hasOwn(value, "fontSize")) return Object.setPrototypeOf(value, FontStyle.prototype);
        if (Object.hasOwn(value, "fontStyle")) return Object.setPrototypeOf(value, Text.prototype);
        if (key === "blocks") return Object.setPrototypeOf(value, BlockStore.prototype);
        if(value.type === "row") return Object.setPrototypeOf(value,Row.prototype);
        if(value.type === "cell") return Object.setPrototypeOf(value,Cell.prototype);
        return value;
    })
}
