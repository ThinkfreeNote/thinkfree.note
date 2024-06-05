import React, {useState} from 'react';
import TextComponent from "./TextComponent";
import {useEditorEventListener} from "../hooks/useEditHandler";
import {useBlockData} from "../hooks/useBlockHooks";
import TextBox from "./TextBox";
import {editorSelection} from "../../../App";

function TextBlock({blockId}) {
    const textBlock = useBlockData(blockId);
    const [targetBlockId, setTargetBlockId] = useState(null);
    const [isHidden, setIsHidden] = useState(true);
    const [refresh, setRefresh] = useState(true);

    // console.log(useContext(BlockStoreContext));
    const onRefresh = () => {
        const value = refresh === false;
        setRefresh(value);
    }

    const updateTextValue = () => {
        // 실제돔 불러오기
        const textNode = editorSelection.getStartNode();
        if (textNode.nodeType !== Node.TEXT_NODE) return;
        const element = editorSelection.getElement()
        const textId = editorSelection.getClosestId("text").start;

        // 모델 가져오고 저장하기
        textBlock.updateTextValue(textId, element.textContent);
    };

    const checkTextSelection = () => {
        // mouseup이 발생했을 때 기본적으로 텍스트 박스를 숨김
        setIsHidden(true);

        // 셀렉션이 아닌 경우 (클릭)
        if (editorSelection.isCaret()) return;
        // 시작 또는 끝 노드가 텍스트가 아닌 경우
        if (!editorSelection.isTextSelection()) return;
        const {start: startNodeBlockId, end: endNodeBlockId} = editorSelection.getClosestId("block");
        // startNode와 endNode가 다른 블럭일 경우
        if (startNodeBlockId !== endNodeBlockId) return;

        setTargetBlockId(startNodeBlockId);
        setIsHidden(false);// 텍스트 박스 표시
    };

    // input이 발생했을 때 BlockStore의 value를 변경해줌
    useEditorEventListener("input", updateTextValue, [updateTextValue]);
    // 마우스 뗄 때 text selection range 정보를 반환
    useEditorEventListener("mouseup", checkTextSelection, [checkTextSelection]);

    // 비어있는 블록
    return (
        <>
            <p>
                {textBlock.textIdList.map(textId => (
                    <TextComponent
                        key={textId}
                        textId={textId}
                        text={textBlock.contents[textId]}
                    />
                ))}
            </p>

            {(targetBlockId === blockId) && !isHidden &&
                <TextBox
                    targetBlockId={targetBlockId}
                    onRefresh={onRefresh}
                />
            }
        </>
    );
}

export default TextBlock;