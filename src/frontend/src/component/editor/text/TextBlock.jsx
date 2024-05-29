import React, {useCallback} from 'react';
import TextComponent from "./TextComponent";
import {useEditorEventListener} from "../hooks/useEditHandler";
import {useBlockData} from "../hooks/useBlockHooks";
import TextBox from "./TextBox";


function TextBlock({blockId}) {
    const textBlock = useBlockData(blockId);

    const insertValue = useCallback((e) => {
        const textNode = window.getSelection().anchorNode;
        if (textNode.nodeType === 3) {
            textBlock.value = textNode.parentElement.innerText;
        }
    }, [textBlock]);

    // input이 발생했을 때 BlockStore의 value를 변경해줌
    useEditorEventListener("input", insertValue,[insertValue]);

    // 비어있는 블록
    if (textBlock.contents.length === 0) {
        return (
            <>
                <p>&#xFEFF;</p>
            </>
        );
    } else {
        return (
            <>
                {textBlock.contents.map((content, index) => (
                    <TextComponent key={index} data={content}/>
                ))}
                <TextBox/>
            </>
        );
    }
}


export default TextBlock;