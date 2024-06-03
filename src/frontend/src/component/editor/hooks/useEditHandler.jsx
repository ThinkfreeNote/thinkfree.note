import {getCaratPositionElement, getClosestBlockId, isCaretAtEnd} from "../../../utils/editor";
import {useContext, useEffect} from "react";
import {EditorContext} from "../NoteEditor";
import {BlockStoreContext, BlockIdListContext} from "../context/BlockIdListProvider";
import useBlockIdList from "./useBlockIdList";


/**
 * @todo 리팩토링 필요
 * @returns {{onKeyDownHandler: (event) => {}}
 */
function useEditHandler() {
    const blockStore = useContext(BlockStoreContext);
    const note = useBlockIdList();

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            const selection = window.getSelection();
            e.preventDefault();

            // 캐럿이 마지막 텍스트 노드에 위치한 경우에만 새로운 Block 추가
            if (selection.type === "Caret" && isCaretAtEnd(selection)) {
                const currentBlockId = getClosestBlockId(getCaratPositionElement());
                const newBlockId = blockStore.createBlock("text").id;
                
                // 현재 커서의 blockId 뒤에 새로운 block 추가
                note.addBlockId(newBlockId, note.getIndexOfBlock(currentBlockId) + 1);
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