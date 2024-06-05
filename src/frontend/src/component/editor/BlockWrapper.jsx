import React, {useEffect, useRef} from 'react';
import {editorSelection} from "../../App";
import BlockContextProvider from "./BlockContextProvider";
import BlockMenuBox from "./block/BlockMenuBox";
import BlockReRender from "./BlockReRender";

/**
 * 블록 공통 기능 구현 목적
 * @param id 블록 아이디
 * @param children
 * @param type
 * @returns {JSX.Element}
 */
function BlockWrapper({id, children,type}) {
    const wrapper = useRef(null);

    // 블록이 처음 생성될 때 커서 위치 지정
    useEffect(() => {
        // 블록 내의 첫번째 leaf 요소에 커서 지정
        const $firstLeaf = wrapper.current.querySelector("[data-leaf]");
        editorSelection.setCaret($firstLeaf);
    }, []);

    return (
        <BlockContextProvider id={id}>
            <div className="block-wrapper" ref={wrapper} data-block-id={id} data-block-type={type}>
                <BlockMenuBox/>
                {children}
                <BlockReRender/>
            </div>
        </BlockContextProvider>
    );
}

export default BlockWrapper;