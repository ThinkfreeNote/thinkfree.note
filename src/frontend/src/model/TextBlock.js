import {Block} from "./Block";
import {getRandomId} from "../utils/id";
import {Text} from "./Text";

export class TextBlock extends Block {
    constructor(id, type, contents = {}, textIdList = []) {
        super(id, type, contents);
        this.textIdList = textIdList;
    }

    addText(text) {
        this.contents[text.id] = text;
        this.textIdList.push(text.id);
    }

    /**
     * 텍스트를 제거하고 삭제된 Text를 반환
     * @param textIdx
     * @returns {{[p: string]: *}|null}
     */
    removeText(textIdx) {
        const text = this.getTextFromIdx(textIdx);
        if (!text) return null;

        const removedFontStyle = {...text.fontStyle};
        const removedText = {...text, id: getRandomId(), fontStyle: removedFontStyle};
        Object.setPrototypeOf(removedText, Text.prototype);
        this.textIdList.splice(textIdx, 1);
        delete this.contents[text.id];

        return removedText;
    }

    updateTextValue(textId, value) {
        this.contents[textId].value = value;
    }

    getTextFromId(textId) {
        return this.contents[textId];
    }

    getTextFromIdx(idx) {
        return this.getTextFromId(this.textIdList[idx]);
    }

    getTextIdx(textId) {
        return this.textIdList.indexOf(textId);
    }

    divideText(textIdx, value1 = "", value2 = "", value3 = "") {
        const text = this.getTextFromIdx(textIdx);
        const valueList = [value1, value2, value3];
        let idx = textIdx;
        let cnt = 0;

        // idx 기준 text를 제거
        delete this.contents[text.id];
        this.textIdList.splice(textIdx, 1);

        // idx 기준 루프 돌면서 text를 추가
        valueList.forEach((value) => {
            if (value === "") return;

            const newFontStyle = {...text.fontStyle};
            const newText = {...text, id: getRandomId(), value: value, fontStyle: newFontStyle};

            Object.setPrototypeOf(newText, Text.prototype);
            this.contents[newText.id] = newText;

            this.textIdList.splice(idx++, 0, newText.id);
            cnt++;
        })

        // 총 증가된 개수 반환
        return cnt - 1;
    }
}