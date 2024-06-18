import React, {createContext, useEffect, useState} from 'react';
import {useSelectionManager} from "../../context/SelectionManagerProvider";

export const BlockReRenderContext = createContext(null);

/**
 * @desc 에디터 밖의 핸들러에서 리렌더링을 유발시키기 위한 컨텍스트
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function BlockReRenderProvider({children}) {
    const [reRenderTargetId,setReRenderTargetId] = useState(null);
    const {recoveryPosition} = useSelectionManager();

    useEffect(()=>{
        recoveryPosition();
    },[reRenderTargetId])

    return <BlockReRenderContext.Provider value={{reRenderTargetId,setReRenderTargetId}}>
        {children}
    </BlockReRenderContext.Provider>

}


export default BlockReRenderProvider;