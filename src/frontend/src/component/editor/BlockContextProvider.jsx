import React, {createContext, useCallback, useState} from 'react';

export const BlockContext = createContext(null);


function BlockContextProvider({children, id}) {
    // 강제 리렌더링 유발 목적
    const [, setState] = useState(0);
    const reRender = useCallback(() => {
        setState(prev => prev + 1);
    }, [])
    return (
        <BlockContext.Provider value={{blockId: id, reRender}}>
            {children}
        </BlockContext.Provider>
    );
}

export default BlockContextProvider;
