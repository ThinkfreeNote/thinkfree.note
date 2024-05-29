import React from 'react';
import TextComponent from "./TextComponent";
import {useEditorEventListener} from "../hooks/useEditHandler";
import {useBlockData} from "../hooks/useBlockHooks";
import TextBox from "./TextBox";


function TextBlock({blockId}) {
    const textBlock = useBlockData(blockId);

    const updateTextValue = (e) => {
        // 실제돔 불러오기
        const textNode = window.getSelection().anchorNode;
        if (textNode.nodeType !== Node.TEXT_NODE) return;
        const element = textNode.parentElement;
        const textId = element.className;

        // 모델 가져오고 저장하기
        const text = textBlock.contents[textId];
        text.value = element.textContent;
        console.log(textBlock);
    };

    const checkTextSelection = (e) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);// 첫번째 셀렉션(다중 셀렉션 x)
        const startNode = range.startContainer;
        const endNode = range.endContainer;

        // 셀렉션이 아닌 경우 (클릭)
        if (range.collapsed) return;
        // 시작 또는 끝 노드가 텍스트가 아닌 경우
        if (startNode.nodeType !== Node.TEXT_NODE || endNode.nodeType !== Node.TEXT_NODE) return;

        // console.log(startNode.parentElement + "" + endNode.parentElement);

    };

    // input이 발생했을 때 BlockStore의 value를 변경해줌
    useEditorEventListener("input", updateTextValue, [updateTextValue]);

    // 마우스 뗄 때 text selection range 정보를 반환
    useEditorEventListener("mouseup", checkTextSelection, [checkTextSelection]);

    // 비어있는 블록
    if (Object.keys(textBlock.contents).length === 0) {
        return (
            <>
                <p>&#xFEFF;</p>
            </>
        );
    } else {
        return (
            <>
                {Object.entries(textBlock.contents).map(([textId, text]) => (
                    <TextComponent key={textId} text={text}/>
                ))}
                <TextBox/>
            </>
        );
    }
}


export default TextBlock;