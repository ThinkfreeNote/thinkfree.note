import {useContext} from 'react';
import {useTableData} from "./useTableData";
import {BlockContext} from "../../BlockContextProvider";

/**
 * @desc 테이블 조작 함수 반환 커스텀 훅
 * @returns {{addColumn, removeColumn, cellHandler, removeRow, addRow}}
 */
function useTable() {
    const tableData = useTableData();
    const {reRender} = useContext(BlockContext);

    const addColumn = (index) => {
        tableData.addColumn(index);
        reRender();
    }

    const addRow = (index) => {
        tableData.addRow(index);
        reRender();
    }

    const removeRow = (index) => {
        tableData.removeRow(index);
        reRender();
    }

    const removeColumn = (index) => {
        tableData.removeColumn(index);
        reRender();
    }

    const toggleHeader = (type) => {
        tableData.toggleHeader(type);
        reRender();
    }

    return {addColumn, addRow, removeRow, removeColumn, toggleHeader}
}

export default useTable;