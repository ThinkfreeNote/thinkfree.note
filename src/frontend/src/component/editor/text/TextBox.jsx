import React, {useState} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";

function TextBox({targetBlockId, targetTextId}) {
    const textBlock = useBlockData(targetBlockId);
    console.log(textBlock);
    const text = textBlock.getText(targetTextId);

    return (
        <div contentEditable={false} style={{userSelect: "none"}}>
            <button onClick={() => text.updateFontStyle("fontWeight", "bold")}>Bord</button>
        </div>
    );
}

export default TextBox;
