import React, {useState} from 'react';
import TextComponent from "./TextComponent";
import {useEditorEventListener} from "../hooks/useEditHandler";
import {useBlockData} from "../hooks/useBlockHooks";
import TextBox from "./TextBox";
import {getClosestBlockId, getClosestTextId} from "../../../utils/editor";



function TextBlock({blockId}) {
    const textBlock = useBlockData(blockId);
    const [targetBlockId, setTargetBlockId] = useState(null);
    const [targetTextId, setTargetTextId] = useState(null);
    const [offset, setOffset] = useState({start: -1, end: -1});


    const updateTextValue = () => {
        // 실제돔 불러오기
        const textNode = window.getSelection().anchorNode;
        if (textNode.nodeType !== Node.TEXT_NODE) return;
        const element = textNode.parentElement;
        const textId = getClosestTextId(element);

        // 모델 가져오고 저장하기
        textBlock.updateTextValue(textId, element.textContent);
    };

    const checkTextSelection = () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);// 첫번째 셀렉션(다중 셀렉션 x)
        const startNode = range.startContainer;
        const endNode = range.endContainer;

        // 셀렉션이 아닌 경우 (클릭)
        if (range.collapsed) return;
        // 시작 또는 끝 노드가 텍스트가 아닌 경우
        if (startNode.nodeType !== Node.TEXT_NODE || endNode.nodeType !== Node.TEXT_NODE) return;
        const startNodeBlockId = getClosestBlockId(startNode.parentElement);
        const endNodeBlockId = getClosestBlockId(startNode.parentElement);
        const textId = getClosestTextId(startNode.parentElement);

        // startNode와 endNode가 다른 블럭일 경우
        if (startNodeBlockId !== endNodeBlockId) {
            return;
        }

        setTargetBlockId(startNodeBlockId);
        setTargetTextId(getClosestTextId(startNode.parentElement));
        setOffset({ start: range.startOffset, end: range.endOffset });
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
                    <TextComponent key={textId} textId={textId} text={text}/>
                ))}
                <TextBox targetBlockId={targetBlockId} targetTextId={targetTextId} offset={offset}/>
            </>
        );
    }
}

export default TextBlock;