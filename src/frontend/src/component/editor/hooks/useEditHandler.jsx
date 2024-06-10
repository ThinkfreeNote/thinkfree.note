import {useContext, useEffect} from "react";
import {EditorContext} from "../NoteEditor";
import useBlockIdList from "./useBlockIdList";
import {editorSelection} from "../../../App";
import {BlockContext} from "../BlockContextProvider";
import {useBlockStore} from "./useBlockHooks";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {Text} from "../../../model/Text";
import {getRandomId} from "../../../utils/id";
import {FontStyle} from "../../../model/FontStyle";

function useEditHandler() {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const note = useBlockIdList();

    const {setReRenderTargetId}  = useContext(BlockReRenderContext);

    const backspaceHandler = (e) => {
        if (!editorSelection.isCaret()) {
            e.preventDefault();
            return;
        }

        const blockId = editorSelection.blockId[0];

        // data leaf 속에 텍스트가 없는 상태에서 삭제 시 블록 삭제
        if (editorSelection.isEmptyBlock()) {
            e.preventDefault();
            // 첫 블록은 delete로 삭제되지 않게 하기 위함
            if(editorSelection.blockId[0] === blockIdList[0]) return;
            // table의 경우 leaf가 셀 단위기 때문에 동작하지 않도록 처리
            if (blockStore.getBlockType(blockId) === "table") return;

            editorSelection.setCaretOfBlockId(blockIdList[blockIdList.indexOf(blockId)-1]);
            note.deleteBlock(blockId);
            return;
        }


        const textNode = editorSelection.getStartNode();
        if (textNode.nodeType === Node.TEXT_NODE) {
            const textBlock = blockStore[blockId];
            const textId = editorSelection.getClosestId("text").start;
            if(!textId) return;
            const textIdx = textBlock.getTextIdx(textId);
            const text = textBlock.getTextFromId(textId);

            if (text.value.length === 1) {
                if(textBlock.textIdList.length === 1) {
                    textBlock.updateTextValue(text.id, "");
                }
                else {
                    textBlock.removeText(textIdx);
                }
            }
        }
    }

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // 캐럿이 아니거나, 테이블인 경우 return
            if (!editorSelection.isCaret() || blockStore.getBlockType(editorSelection.blockId[0]) === "table") return;
            if(editorSelection.getBlockType() === "title") return;
            // 텍스트가 선택됐는지 확인
            const textBlock = blockStore.getBlock(editorSelection.getClosestId("block").start);
            const text = textBlock.getTextFromId(editorSelection.getClosestId("text").start);
            if (!text) return;

            // 분리하고 업데이트된 textIdx 구함
            const dividedTextContents = editorSelection.getDividedTextContentsFromCaret();
            let textIdx = textBlock.getTextIdx(text.id);
            const cnt = textBlock.divideText(textIdx, dividedTextContents.before, dividedTextContents.after);

            // text 마지막에 캐럿이 잡힐 경우 예외 처리
            if (dividedTextContents.after === "") textIdx++;

            // 추가된만큼 idx 증가
            textIdx += cnt;

            // 기존 textBlock에 있는 text들 삭제
            const removedTextList = [];
            while (true) {
                const text = textBlock.removeText(textIdx);
                if (!text) break;
                removedTextList.push(text);
            }
            if(textBlock.textIdList.length === 0) {
                textBlock.addText(new Text(getRandomId(), "", new FontStyle()));
            }

            // 새로운 Text들을 담은 TextBlock을 추가 (이전과 같은 타입의 텍스트 블럭을 생성)
            note.addBlockId(blockStore.createBlock(textBlock.type, removedTextList, textBlock.olIdx).id, note.getIndexOfBlock(textBlock.id) + 1);
            // 기존 TextBlock 리렌더링
            setReRenderTargetId(textBlock.id);

            console.log(blockStore);
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

        const handlerWrapper = (e) => {
            // 해당 블록에 속할 때만 핸들러 실행
            if (editorSelection.isNullSelection() || blockId !== editorSelection.getClosestId("block").start) return;
            handler(e);
        }

        $editor.addEventListener(eventType, handlerWrapper);

        return () => {
            $editor.removeEventListener(eventType, handlerWrapper);
        }
    }, [editorRef, eventType, handler]);
}

export default useEditHandler;