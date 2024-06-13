import {editorSelection} from "../../../../App";
import {useBlockStore} from "../../hooks/useBlockHooks";

function useTextHandler() {
    const blockStore = useBlockStore();

    const updateTextValue = () => {
        // 실제돔 불러오기
        const textNode = editorSelection.getStartNode();
        if (textNode.nodeType !== Node.TEXT_NODE) return;
        const element = editorSelection.getElement().startElement;
        const textId = editorSelection.getClosestId("text").start;
        const blockId = editorSelection.blockId[0];

        const textBlock = blockStore.getBlock(blockId);
        // 모델 가져오고 저장하기
        textBlock.updateTextValue(textId, element.textContent);
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


    return {updateTextValue, deleteTextValue}
}

export default useTextHandler;