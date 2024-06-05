import {getRandomId} from "../utils/id";
import {TextBlock} from "./TextBlock";
import {Table} from "./Table";
import {Text} from "./Text";

export class BlockStore {
    // 블럭 조회
    getBlock(blockId) {
        return this[blockId];
    }

    // 블럭을 스토어에 추가
    addBlock(block) {
        this[block.id] = block;
    }

    // 블럭을 생성하여 스토어에 추가
    createBlock(type) {
        const blockId = getRandomId();

        if (type === "text") {
            const textBlock = new TextBlock(blockId, type, {});
            textBlock.addText(new Text(getRandomId(), "", null));
            this.addBlock(textBlock);
            return textBlock;
        } else if (type === "table") {
            const table = new Table(blockId, type, []);
            this.addBlock(table);
            return table;
        }
    }

    duplicateBlock(originId) {
        const blockId = getRandomId();

        const newBlock = JSON.parse(JSON.stringify({...this[originId]}));
        Object.setPrototypeOf(newBlock, Object.getPrototypeOf(this[originId]));

        newBlock.id = blockId;
        this[blockId] = newBlock;

        return blockId;
    }
}