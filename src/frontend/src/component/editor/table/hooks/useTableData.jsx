import {useContext} from "react";
import {BlockIdContext} from "../../BlockWrapper";
import {useBlockData} from "../../hooks/useBlockHooks";

/**
 * @desc 현재 컴포넌트가 포함되어 있는 테이블 블록 가져오는 훅
 * @returns {Table}
 */
export function useTableData() {
    const {blockId} = useContext(BlockIdContext);
    
    return useBlockData(blockId);
}
