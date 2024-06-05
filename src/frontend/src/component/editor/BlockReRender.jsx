import {useContext, useEffect} from 'react';
import {BlockReRenderContext} from "./context/BlockReRenderContext";
import {BlockContext} from "./BlockContextProvider";


/**
 * @desc 블록 밖에서 발생한 리렌더링 처리
 * @returns {null}
 * @constructor
 */
function BlockReRender() {
    const {reRender,blockId} = useContext(BlockContext);
    // 블록 밖에서 블록 리렌더링 유발 목적 (
    const {reRenderTargetId, setReRenderTargetId} = useContext(BlockReRenderContext);
    useEffect(() => {
        if (reRenderTargetId === blockId) {
            reRender();
            setReRenderTargetId(null);
        }
    }, [reRenderTargetId,reRender,setReRenderTargetId]);

    return null;
}

export default BlockReRender;