import React, {createContext, useCallback, useEffect, useRef, useState} from 'react';

export const BlockIdContext = createContext(null);

/**
 * 블록 공통 기능 구현 목적
 * @param id 블록 아이디
 * @param children
 * @returns {JSX.Element}
 */
function BlockWrapper({id, children}) {
    const wrapper = useRef(null);

    // 강제 리렌더링 유발 목적
    const [_, setState] = useState(0);
    const reRender = useCallback(() => {
        setState(prev => prev + 1);
    }, [])

    // 최초 생성 시 캐럿 위치 초기화
    // ! 추후 텍스트, 테이블 개발 완료 시 제거 예정
    useEffect(() => {
        const selection = window.getSelection();

        const newRange = document.createRange();

        const targetNode = wrapper.current.childNodes[0];
        const lastChild = targetNode.lastChild;
        newRange.setStart(lastChild, 1);
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);
    }, []);

    return (
        <BlockIdContext.Provider value={{blockId: id, reRender}}>
            <div className="block_wrapper" ref={wrapper} data-block-id={id}>
                {children}
            </div>
        </BlockIdContext.Provider>
    );
}

export default BlockWrapper;