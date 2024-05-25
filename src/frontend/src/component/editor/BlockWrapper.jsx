import React from 'react';


/**
 * 블록 공통 기능 구현 목적
 * @param children
 * @returns {Element}
 */
function BlockWrapper({id,children}) {
    return (
        <div data-block-id={id}>
            {children}
        </div>
    );
}

export default BlockWrapper;