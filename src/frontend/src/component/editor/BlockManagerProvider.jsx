import React, {createContext, useCallback, useContext, useState} from 'react';

const BlockManagerContext = createContext(null);

function BlockManagerProvider({children, id}) {
    // 강제 리렌더링 유발 목적
    const [, setState] = useState(0);
    const reRender = useCallback(() => {
        setState(prev => prev + 1);
    }, [])
    return (
        <BlockManagerContext.Provider value={{blockId: id, reRender}}>
            {children}
        </BlockManagerContext.Provider>
    );
}

/**
 * @desc 현재 컴포넌트가 속해있는 블록을 강제로 리렌더링 해주는 함수를 반환하는 hook
 * @returns {{reRender : function}}
 */
export function useBlockReRender() {
    const {reRender} = useContext(BlockManagerContext);

    return {reRender};
}

/**
 * @desc 현재 컴포넌트가 속해있는 블록의 id를 가져오는 hook
 * @returns {{blockId : String}}
 */
export function useBlockId() {
    const {blockId} = useContext(BlockManagerContext);

    return {blockId};
}

export default BlockManagerProvider;
