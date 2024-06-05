import {isCaretAtEnd} from "../../../utils/editor";
import {useContext, useEffect} from "react";
import {EditorContext} from "../NoteEditor";
import {BlockStoreContext} from "../context/BlockIdListProvider";
import useBlockIdList from "./useBlockIdList";
import {editorSelection} from "../../../App";
import {BlockContext} from "../BlockContextProvider";


/**
 * @todo 리팩토링 필요
 * @returns {{onKeyDownHandler: (event) => {}}
 */
function useEditHandler() {
    const blockStore = useContext(BlockStoreContext);
    const note = useBlockIdList();

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            // 캐럿이 마지막 텍스트 노드에 위치한 경우에만 새로운 Block 추가
            if (editorSelection.isCaret() && isCaretAtEnd(window.getSelection())) {
                const {start : startBlockId} = editorSelection.getClosestId("block");
                const newBlockId = blockStore.createBlock("text").id;
                
                // 현재 커서의 blockId 뒤에 새로운 block 추가
                note.addBlockId(newBlockId, note.getIndexOfBlock(startBlockId) + 1);
            }
        }
        else if(e.key === "Backspace") {
            if(editorSelection.isCaret()){
                // editorSelection.getStartNode().textContent.length === 1 && e.preventDefault();
            }
            else {
                e.preventDefault();
            }
            // 캐럿인 경우
            // 셀렉션인 경우

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