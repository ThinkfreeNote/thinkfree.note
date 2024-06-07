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

    divideText(textIdx, value1, value2, value3 = "") {
        const text = this.getTextFromIdx(textIdx);

        // 복사 객체 생성
        const newFontStyle1 = {...text.fontStyle};
        const newFontStyle2 = {...text.fontStyle};
        const newFontStyle3 = {...text.fontStyle};
        const newText1 = {...text, id: getRandomId(), value: value1, fontStyle: newFontStyle1};
        Object.setPrototypeOf(newText1, Text.prototype);
        const newText2 = {...text, id: getRandomId(), value: value2, fontStyle: newFontStyle2};
        Object.setPrototypeOf(newText2, Text.prototype);

        // 기존 객체, idList 삭제 및 추가
        delete this.contents[text.id];
        this.contents[newText1.id] = newText1;
        this.contents[newText2.id] = newText2;

        // value가 2개인 경우
        if (value3 === "") {
            this.textIdList.splice(textIdx, 1, newText1.id, newText2.id);
            return;
        }

        // value가 3개인 경우
        const newText3 = {...text, id: getRandomId(), value: value3, fontStyle: newFontStyle3};
        Object.setPrototypeOf(newText3, Text.prototype);
        this.textIdList.splice(textIdx, 1, newText1.id, newText2.id, newText3.id);
        this.contents[newText3.id] = newText3;
    }
}