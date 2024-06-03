import {getCaratPositionElement, getClosestBlockId, isCaretAtEnd} from "../../../utils/editor";
import {useContext, useEffect} from "react";
import {BlockStoreContext} from "../../container/NoteEditorContainer";
import {EditorContext} from "../NoteEditor";


/**
 * @todo 리팩토링 필요
 * @param noteContents
 * @param setNoteContents
 * @returns {{onKeyDownHandler: onKeyDownHandler}}
 */
function useEditHandler(noteContents, setNoteContents) {
    const blockStore = useContext(BlockStoreContext);

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            const selection = window.getSelection();
            e.preventDefault();

            // 캐럿이 마지막 텍스트 노드에 위치한 경우에만 새로운 Block 추가
            if (selection.type === "Caret" && isCaretAtEnd(selection)) {
                addNewBlock();
            }
        }
    }

    const addNewBlock = () => {
        // 현재 블록 아이디
        const currentBlockId = getClosestBlockId(getCaratPositionElement());
        const newBlockId = blockStore.createBlock("text").id;

        const currentIndex = noteContents.indexOf(currentBlockId);

        const newNoteContents = [...noteContents];
        newNoteContents.splice(currentIndex + 1, 0, newBlockId);
        setNoteContents(newNoteContents);
    }
    return {onKeyDownHandler};
}


/**
 * @desc contentEditable요소(에디터)에 이벤트를 등록하는 훅
 * @param {string} eventType (input, click, mouseup... etc)
 * @param handler 등록할 핸들러 함수
 * @param dependency useEffect 의존성
 */
export function useEditorEventListener(eventType,handler,dependency = [handler]) {
    const editorRef = useContext(EditorContext);

    useEffect(() => {
        const $editor = editorRef.current;
        if(!($editor instanceof HTMLElement)) return;

        $editor.addEventListener(eventType,handler);

        return () => {
            $editor.removeEventListener(eventType,handler);
        }
    }, [...dependency,editorRef,eventType,handler]);
}

export default useEditHandler;