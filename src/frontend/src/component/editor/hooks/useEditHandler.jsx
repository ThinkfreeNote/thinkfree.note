import {useContext, useEffect} from "react";
import {EditorContext} from "../NoteEditor";
import useBlockIdList from "./useBlockIdList";
import {editorSelection} from "../../../App";
import {useBlockStore} from "./useBlockHooks";


/**
 * @todo 리팩토링 필요
 * @returns {{onKeyDownHandler: (event) => {}}
 */
function useEditHandler() {
    const blockStore = useBlockStore();
    const note = useBlockIdList();

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // 캐럿인지 확인
            if (!editorSelection.isCaret()) return;
            // 텍스트가 선택됐는지 확인
            if (!editorSelection.isTextSelection()) return;

            // 분리하고 업데이트된 textIdx 구해옴
            const textBlock = blockStore.getBlock(editorSelection.getClosestId("block").start);
            const {startNode: dividedTextContents} = editorSelection.getDividedTextContents();
            const text = textBlock.getTextFromId(editorSelection.getClosestId("text").start);
            let textIdx = textBlock.getTextIdx(text.id);
            textBlock.divideText(textIdx, dividedTextContents[0], dividedTextContents[1]);
            textIdx++;

            // 기존 삭제
            const removedText = textBlock.removeText(textIdx);

            // 새로운 블럭 삽입
            note.addBlockId(blockStore.createBlock("text", removedText).id);
        }
    }
    return {onKeyDownHandler};
}


/**
 * @desc contentEditable요소(에디터)에 이벤트를 등록하는 훅
 * @param {string} eventType (input, click, mouseup... etc)
 * @param handler 등록할 핸들러 함수
 */
export function useEditorEventListener(eventType, handler) {
    const editorRef = useContext(EditorContext);

    useEffect(() => {
        const $editor = editorRef.current;
        if (!($editor instanceof HTMLElement)) return;

        $editor.addEventListener(eventType, handler);

        return () => {
            $editor.removeEventListener(eventType, handler);
        }
    }, [editorRef, eventType, handler]);
}

export default useEditHandler;