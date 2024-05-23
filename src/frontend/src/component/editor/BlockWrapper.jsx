import React from 'react';


/**
 * 블록 공통 기능 구현 목적
 * @param children
 * @returns {Element}
 */
function BlockWrapper({children}) {
    return (
        <div>
            {children}
        </div>
    );
}

export default BlockWrapper;