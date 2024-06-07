import {useContext, useEffect} from "react";
import {EditorContext} from "../NoteEditor";
import useBlockIdList from "./useBlockIdList";
import {editorSelection} from "../../../App";
import {BlockContext} from "../BlockContextProvider";
import {useBlockStore} from "./useBlockHooks";

function useEditHandler() {
    const blockStore = useBlockStore();
    const note = useBlockIdList();


    const backspaceHandler = (e) => {
        if(!editorSelection.isCaret()) {
            e.preventDefault();
            return;
        }

        // data leaf 속에 텍스트가 없는 상태에서 삭제 시 블록 삭제
        if(editorSelection.isEmptyBlock()) {
            const blockId =  editorSelection.blockId[0];
            // table의 경우 leaf가 셀 단위기 때문에 동작하지 않도록 처리
            if(blockStore.getBlockType(blockId) === "table") return;
            note.deleteBlock(blockId);
        }
    }

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // 캐럿인지 확인
            if (!editorSelection.isCaret()) return;
            // 텍스트가 선택됐는지 확인
            const textBlock = blockStore.getBlock(editorSelection.getClosestId("block").start);
            const text = textBlock.getTextFromId(editorSelection.getClosestId("text").start);
            if (!text) return;

            // 분리하고 업데이트된 textIdx 구함
            const {startNode: dividedTextContents} = editorSelection.getDividedTextContents();
            let textIdx = textBlock.getTextIdx(text.id);
            textBlock.divideText(textIdx, dividedTextContents[0], dividedTextContents[1]);

            // text들 사이에 있는 캐럿 오류 해결
            if (!textBlock.isLastText(textIdx) && dividedTextContents[1] === "") {
                textBlock.removeText(textIdx + 1);
            }
            textIdx++;

            // 기존 textBlock에 있는 text들 삭제
            const removedTextList = [];
            while(true) {
                const text = textBlock.removeText(textIdx);
                if(!text) break;
                removedTextList.push(text);
            }

            // 새로운 Text들을 담은 TextBlock을 추가
            note.addBlockId(blockStore.createBlock("text", removedTextList).id,note.getIndexOfBlock(textBlock.id) + 1);

        }

        e.key === "Backspace" && backspaceHandler(e);
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