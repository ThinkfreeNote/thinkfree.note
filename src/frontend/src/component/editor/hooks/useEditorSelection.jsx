import {useEffect} from "react";
import {editorSelection} from "../../../App";

function useEditorSelection(blockIdList) {

    useEffect(() => {
    console.log(editorSelection);
        const handler = () => {
            editorSelection.updateEditorSelection(blockIdList);
        }
        document.addEventListener("selectionchange", handler);

        return () => {
            document.removeEventListener("selectionchange", handler);
        }
    }, [blockIdList]);
}

export default useEditorSelection;