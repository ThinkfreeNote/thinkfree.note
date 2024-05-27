import {useContext, useEffect} from 'react';
import {BlockStoreContext} from "../../../container/NoteEditorContainer";
import {getCellIds, isCell} from "../../../../utils/table";


function UseTable({contentEditableRef, blockId}) {
    const blockStore = useContext(BlockStoreContext);
    const blockData = blockStore[blockId];

    useEffect(() => {
        if (!contentEditableRef.current) return;

        const updateStore = (e) => {
            const {anchorNode} = window.getSelection();
            // 요소 가져와서 셀인지 확인
            const $cell = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
            if(!isCell($cell)) return;

            let value = `\uFEFF`
            if (anchorNode.nodeType === Node.TEXT_NODE) {
                value = anchorNode.nodeValue.replace(/\uFEFF/, "");
            }

            const {blockId,rowId,cellId} = getCellIds($cell);

            // blockStore 업데이트
            blockStore[blockId].rows[rowId][cellId] = value;
        }
        contentEditableRef.current.addEventListener("input", updateStore);

        return () => {
            if (!contentEditableRef.current) return;
            contentEditableRef.current.removeEventListener("input", updateStore);
        }
    }, [contentEditableRef]);

    return [blockData]
}

export default UseTable;