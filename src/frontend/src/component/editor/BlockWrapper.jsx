import React, {useEffect, useRef} from 'react';

/**
 * 블록 공통 기능 구현 목적
 * @param id 블록 아이디
 * @param children
 * @returns {JSX.Element}
 */
function BlockWrapper({id,children}) {
    const wrapper = useRef(null);

    // 최초 생성 시 캐럿 위치 초기화
    useEffect(() => {
        const selection = window.getSelection();

        const newRange = document.createRange();

        const targetNode = wrapper.current.childNodes[0];
        const lastChild = targetNode.lastChild;
        newRange.setStart(lastChild,1);
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);
    }, []);

    return (
        <div className="block_wrapper" ref={wrapper} data-block-id={id}>
            {children}
        </div>
    );
}

export default BlockWrapper;