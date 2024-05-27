import {createBlock, getBlockId, getCaratPositionElement, isCaretAtEnd} from "../../../utils/editor";
import {useContext, useEffect} from "react";
import {BlockStoreContext} from "../../container/NoteEditorContainer";

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
        const currentBlockId = getBlockId(getCaratPositionElement());
        const newBlockId = createBlock(blockStore, "text");

        const currentIndex = noteContents.indexOf(currentBlockId);

        const newNoteContents = [...noteContents];
        newNoteContents.splice(currentIndex + 1, 0, newBlockId);
        setNoteContents(newNoteContents);
    }
    return {onKeyDownHandler};
}

export default useEditHandler;