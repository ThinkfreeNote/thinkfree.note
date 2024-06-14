import React, {useEffect, useRef} from 'react';
import {editorSelection} from "../../App";
import BlockManagerProvider from "./BlockManagerProvider";
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

    // 블록이 처음 생성될 때 해당 블록에 커서 전달
    useEffect(() => {
        const $block = wrapper.current;
        if(!$block) return;

        // 셀렉션 모델의 캐럿과 블록 생성 시 캐럿이 동작이 약간 달라 추후 셀렉션의 커서 함수로 공통화 예정
        setCursor($block,type);
    }, []);

    return (
        <BlockManagerProvider id={id}>
            <div className="block-wrapper" ref={wrapper} data-block-id={id} data-block-type={type}>
                <BlockMenuBox/>
                {children}
                <BlockReRender/>
            </div>
        </BlockManagerProvider>
    );
}

/**
 * @desc 현재 블록에 커서를 주는 함수
 * @param $block
 * @param type
 */
function setCursor($block, type) {
    // 블록 내의 첫번째 leaf 요소에 커서 지정
    const $firstLeaf = $block.querySelector("[data-leaf]");
    const $br = $firstLeaf.querySelector("br");
    if($br){
        editorSelection.setCaret($br);
    }
    else {
        let lastTextNode = "";
        // 테이블의 경우
        if(type === "table") {
            lastTextNode = [...$firstLeaf.childNodes].find(item => item.nodeType === Node.TEXT_NODE);

        }
        // 테이블 이외의 경우 (span 태그위주)
        else {
            lastTextNode = $firstLeaf.firstChild.childNodes[0];
        }

        editorSelection.setCaret(lastTextNode);
    }
}

export default BlockWrapper;