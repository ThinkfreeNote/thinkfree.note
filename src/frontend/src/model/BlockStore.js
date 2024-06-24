import {getRandomId} from "../utils/id";
import {TextBlock} from "./text/TextBlock";
import {Table} from "./Table/Table";
import {Text} from "./text/Text";
import {FontStyle} from "./text/FontStyle";
import {ListBlock} from "./list/ListBlock";
import {jsonToBlockStore} from "../utils/json";
import {HeadBlock} from "./head/HeadBlock";
import {ContentsBlock} from "./head/ContentsBlock";

/**
 * @typedef {ListBlock, TextBlock, Table} BlockModel
 */


export class BlockStore {
    /**
     * @param blockId
     * @returns {BlockModel}
     */
    getBlock(blockId) {
        return this[blockId];
    }

    // 블럭을 스토어에 추가
    addBlock(block) {
        this[block.id] = block;
    }

    // from 블럭에서 to블럭으로 text 객체 이동
    compositeBlock(fromId, toId) {
        const fromBlock = this.getBlock(fromId);
        const toBlock = this.getBlock(toId);

        if (toBlock.textIdList.length === 1 && toBlock.getTextFromIdx(0).value.length === 0) {
            toBlock.removeText(0);
        }

        // textIdList 결합
        toBlock.textIdList = toBlock.textIdList.concat(fromBlock.textIdList);

        // 텍스트 객체 이동
        fromBlock.textIdList.forEach(textId => {
            toBlock.contents[textId] = fromBlock.contents[textId];
            delete fromBlock.contents[textId];
        });
    }


    // 블럭을 생성하여 스토어에 추가
    createNewBlock(type, textList = [], headLevel = 1) {
        const blockId = getRandomId();
        if (type === "text") {
            const textBlock = new TextBlock(blockId, type, {}, []);

            // 인자로 들어온 텍스트가 없으면 기본값
            textList.length === 0 ?
                textBlock.addText(new Text(getRandomId(), "", new FontStyle())) :
                textList.forEach((text) => textBlock.addText(text));

            this.addBlock(textBlock);

            return textBlock;

        } else if (type === "ul" || type === "ol") {
            const listBlock = new ListBlock(blockId, type, {}, "", [], 0);
            // 인자로 들어온 텍스트가 없으면 기본값
            textList.length === 0 ?
                listBlock.addText(new Text(getRandomId(), "", new FontStyle())) :
                textList.forEach((text) => listBlock.addText(text));
            this.addBlock(listBlock);

            return listBlock;

        } else if (type === "head") {
            const headBlock = new HeadBlock(blockId, type, {}, headLevel);

            // 인자로 들어온 텍스트가 없으면 기본값
            textList.length === 0 ?
                headBlock.addText(new Text(getRandomId(), "", new FontStyle())) :
                textList.forEach((text) => headBlock.addText(text));
            this.addBlock(headBlock);

            return headBlock;
        } else if (type === "contents") {
            const contentsBlock = new ContentsBlock(blockId, type, {});
            this.addBlock(contentsBlock);

            return contentsBlock;
        } else if (type === "table") {
            const table = new Table(blockId, type, []);
            this.addBlock(table);

            return table;
        }
    }

    duplicateBlock(originId) {
        const blockId = getRandomId();

        const newBlock = jsonToBlockStore(JSON.stringify({...this[originId]}));
        Object.setPrototypeOf(newBlock, Object.getPrototypeOf(this[originId]));

        newBlock.id = blockId;
        this[blockId] = newBlock;

        return blockId;
    }

    getBlockType(blockId) {
        return this[blockId]?.type;
    }
}