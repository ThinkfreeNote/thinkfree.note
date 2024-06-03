import {useContext} from "react";
import {useBlockData} from "../../hooks/useBlockHooks";
import {BlockContext} from "../../BlockContextProvider";

/**
 * @desc 현재 컴포넌트가 포함되어 있는 테이블 블록 가져오는 훅
 * @returns {Table}
 */
export function useTableData() {
    const {blockId} = useContext(BlockContext);
    
    return useBlockData(blockId);
}
