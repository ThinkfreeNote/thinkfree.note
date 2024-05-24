import {createBlock, getBlockId, getCaratPositionElement, setSelection} from "../../../utils/editor";
import {useContext, useEffect, useState} from "react";
import {BlockStoreContext} from "../../container/NoteEditorContainer";

function useEditHandler(noteContents, setNoteContents) {
    const blockStore = useContext(BlockStoreContext);

    useEffect(() => {

    }, []);

    const onKeyDownHandler = (e) => {
        try {
            if (e.key === "Enter") {
                e.preventDefault();
                addNewBlock();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onClick = (e) =>{
        console.log(window.getSelection());
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
    return {onKeyDownHandler,onClick};
}

export default useEditHandler;