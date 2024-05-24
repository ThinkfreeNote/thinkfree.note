import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {setSelection} from "../../utils/editor";


/**
 * 블록 공통 기능 구현 목적
 * @param id 블록 아이디
 * @param children
 * @returns {Element}
 */
function BlockWrapper({id,children}) {
    const blockRef = useRef(null);

    useLayoutEffect(() => {
        const selection = window.getSelection();

        const newRange = document.createRange();

        const targetNode = blockRef.current.childNodes[0];

        newRange.setStart(targetNode,0);
        newRange.setEnd(targetNode,0);

        selection.removeAllRanges();
        selection.addRange(newRange);
    }, []);
    return (
        <div ref={blockRef} data-block-id={id} style={{minHeight : "30px", paddingLeft : "10px"}}>
            {children}
        </div>
    );
}

export default BlockWrapper;