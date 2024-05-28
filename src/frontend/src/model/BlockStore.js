import {getRandomId} from "../utils/id";
import {TextBlock} from "./TextBlock";
import {Table} from "./Table";

export class BlockStore {
    // 블럭을 스토어에 추가
    addBlock(block) {
        this[block.id] = block;
    }

    // 블럭을 생성하여 스토어에 추가
    createBlock(type) {
        const blockId = getRandomId();

        if (type === "text") {
            const text = new TextBlock(blockId, type, []);
            this.addBlock(text);
            return text;
        } else if (type === "table") {
            const table = new Table(blockId, type, []);
            this.addBlock(table);
            return table;
        }
    }
}