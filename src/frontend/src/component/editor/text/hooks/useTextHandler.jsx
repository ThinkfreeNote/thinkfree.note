import {editorSelection} from "../../../../App";
import {useBlockStore} from "../../hooks/useBlockHooks";
import {Text} from "../../../../model/Text";
import {getRandomId} from "../../../../utils/id";
import {FontStyle} from "../../../../model/FontStyle";

function useTextHandler() {
    const blockStore = useBlockStore();

    /**
     * Text 를 분리하고 분리된 텍스트 객체들을 반환
     */
    const divideText = (block) => {
        // 분리하고 업데이트된 textIdx 구함
        const text = block.getTextFromId(editorSelection.getClosestId("text").start);
        let textIdx = block.getTextIdx(text.id);
        const dividedTextContents = editorSelection.getDividedTextContentsFromCaret();
        const cnt = block.divideText(textIdx, dividedTextContents.before, dividedTextContents.after);

        // text 마지막에 캐럿이 잡힐 경우 예외 처리
        if (dividedTextContents.after === "") textIdx++;

        // 추가된만큼 idx 증가
        textIdx += cnt;

        // 기존 textBlock에 있는 text들 삭제
        const removedTextList = [];
        while (true) {
            const text = block.removeText(textIdx);
            if (!text) break;
            removedTextList.push(text);
        }
        if (block.textIdList.length === 0) {
            block.addText(new Text(getRandomId(), "", new FontStyle()));
        }
        return removedTextList;
    }

    const updateTextValue = () => {
        // 실제돔 불러오기
        const textNode = editorSelection.getStartNode();
        if (textNode.nodeType !== Node.TEXT_NODE) return;
        const element = editorSelection.getElement().startElement;
        const textId = editorSelection.getClosestId("text").start;
        const blockId = editorSelection.startBlockId;
        const block = blockStore.getBlock(blockId);

        // 모델 가져오고 저장하기
        block.updateTextValue(textId, element.textContent);
    };

    const deleteTextValue = () => {
        const blockId = editorSelection.blockId[0];
        const textBlock = blockStore[blockId];

        // text 모델 제거
        const textNode = editorSelection.getStartNode();
        if (textNode.nodeType === Node.TEXT_NODE) {
            const textId = editorSelection.getClosestId("text").start;
            if (!textId) return;
            const textIdx = textBlock.getTextIdx(textId);
            const text = textBlock.getTextFromId(textId);

            if (text.value.length === 1) {
                if (textBlock.textIdList.length === 1) {
                    textBlock.updateTextValue(text.id, "");
                } else {
                    textBlock.removeText(textIdx);
                }
            }
        }
    }

    return {updateTextValue, deleteTextValue, divideText}
}

export default useTextHandler;