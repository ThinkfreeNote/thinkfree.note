import React from 'react';
import {editorSelection} from "../../../App";
import {useEditorEventListener} from "../hooks/useEditHandler";
import {useBlockData} from "../hooks/useBlockHooks";
import {useBlockId} from "../BlockManagerProvider";

/**
 * @desc TextComponent 에 불필요한 리렌더링이 발생하지 않기 위해 로직을 분리하는 컴포넌트
 * @param children
 * @returns {JSX.Element}
 */
function TextWrapper({children}) {
    const {blockId} = useBlockId();
    const textBlock = useBlockData(blockId);

    const updateTextValue = () => {
        // 실제돔 불러오기
        const textNode = editorSelection.getStartNode();
        if (textNode.nodeType !== Node.TEXT_NODE) return;
        const element = editorSelection.getElement().startElement;
        const textId = editorSelection.getClosestId("text").start;

        // 모델 가져오고 저장하기
        textBlock.updateTextValue(textId, element.textContent);
    };

    // input이 발생했을 때 BlockStore의 value를 변경해줌
    useEditorEventListener("input", updateTextValue);

    return (
        <>
            {/*이 컴포넌트가 리렌더링 되더라도 children 은 재귀적으로 리렌더링이 발생하지 않음*/}
            {children}
        </>
    );
}

export default TextWrapper;