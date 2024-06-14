import {useBlockData} from "../../hooks/useBlockHooks";
import {useBlockId} from "../../BlockManagerProvider";

/**
 * @desc 현재 컴포넌트가 포함되어 있는 테이블 블록 가져오는 훅
 * @returns {Table}
 */
export function useTableData() {
    const {blockId} = useBlockId();
    
    return useBlockData(blockId);
}
