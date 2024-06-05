import {useContext, useEffect} from "react";
import {EditorContext} from "../NoteEditor";
import useBlockIdList from "./useBlockIdList";
import {editorSelection} from "../../../App";
import {BlockContext} from "../BlockContextProvider";
import {useBlockStore} from "./useBlockHooks";
import {Text} from "../../../model/Text";


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
            const textBlock = blockStore.getBlock(editorSelection.getClosestId("block").start);
            const text = textBlock.getTextFromId(editorSelection.getClosestId("text").start);
            if (!text) return;

            // 분리하고 업데이트된 textIdx 구해옴
            const {startNode: dividedTextContents} = editorSelection.getDividedTextContents();
            let textIdx = textBlock.getTextIdx(text.id);
            textBlock.divideText(textIdx, dividedTextContents[0], dividedTextContents[1]);
            textIdx++;

            // 기존 삭제
            const removedText = textBlock.removeText(textIdx);

            // 새로운 블럭 삽입
            note.addBlockId(blockStore.createBlock("text", removedText).id,note.getIndexOfBlock(textBlock.id) + 1);

        } else if(e.key === "Backspace") {
            if (editorSelection.isCaret()) {
                // editorSelection.getStartNode().textContent.length === 1 && e.preventDefault();
            } else {
                e.preventDefault();
            }
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
    const {blockId} = useContext(BlockContext);

    useEffect(() => {
        const $editor = editorRef.current;
        if (!($editor instanceof HTMLElement)) return;

        const handlerWrapper = (e)=> {
            // 해당 블록에 속할 때만 핸들러 실행
            if(editorSelection.isNullSelection() || blockId !== editorSelection.getClosestId("block").start) return;
            handler(e);
        }

        $editor.addEventListener(eventType, handlerWrapper);

        return () => {
            $editor.removeEventListener(eventType, handlerWrapper);
        }
    }, [editorRef, eventType, handler]);
}

export default useEditHandler;