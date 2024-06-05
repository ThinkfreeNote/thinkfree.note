import React, {createContext, useState} from 'react';

export const BlockReRenderContext = createContext(null);

/**
 * @desc 에디터 밖의 핸들러에서 리렌더링을 유발시키기 위한 컨텍스트
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function BlockReRenderContextProvider({children}) {
    const [reRenderTargetId,setReRenderTargetId] = useState(null);

    return <BlockReRenderContext.Provider value={{reRenderTargetId,setReRenderTargetId}}>
        {children}
    </BlockReRenderContext.Provider>

}

export default BlockReRenderContextProvider;