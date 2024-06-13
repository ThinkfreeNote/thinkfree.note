import {useEffect} from "react";
import {editorSelection} from "../../../App";

/**
 * @desc 에디터가 관리하는 셀렉션
 * @param blockIdList
 */
function useEditorSelection(blockIdList) {

    useEffect(() => {
        const handler = () => {
            editorSelection.updateEditorSelection(blockIdList);

            (editorSelection.isEditor() && !editorSelection.isLeaf()) && editorSelection.removeSelection();
        }
        document.addEventListener("selectionchange", handler);

        return () => {
            document.removeEventListener("selectionchange", handler);
        }
    }, [blockIdList]);
}

export default useEditorSelection;