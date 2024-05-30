import useTable from "./useTable";
import {useEditorEventListener} from "../../hooks/useEditHandler";

export function useTableHandlers(tableData) {
    // 에디터에 테이블 조작 핸들러 등록
    const {cellHandler} = useTable(tableData);
    useEditorEventListener("input", cellHandler, [cellHandler]);
}
