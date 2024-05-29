import React from 'react';
import TextComponent from "./TextComponent";
import {useEditorEventListener} from "../hooks/useEditHandler";
import {useBlockData} from "../hooks/useBlockHooks";
import TextBox from "./TextBox";


function TextBlock({blockId}) {
    const data = useBlockData(blockId);
    console.log(data);

    const handler = (e) => {
        const element = window.getSelection().anchorNode.parentElement;
        data.value = element.innerText;
        console.log(data);
    }

    useEditorEventListener("input", handler, [handler]);
    // 비어있는 블록
    if (data.contents.length === 0) {
        return (
            <>
                <p>&#xFEFF;</p>
            </>
        );
    } else {
        return (
            <>
                {data.contents.map((index, content) => (
                    <TextComponent key={index} data={content}/>
                ))}
                <TextBox/>
            </>
        );
    }
}


export default TextBlock;