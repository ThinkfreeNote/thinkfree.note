import React, {useState} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";

function TextBox({targetBlockId, targetTextId, onRefresh}) {
    const textBlock = useBlockData(targetBlockId);
    const text = textBlock.getText(targetTextId);

    return (
        <div contentEditable={false} style={{userSelect: "none"}}>
            <button onClick={() => text.updateFontStyle("fontWeight", "bold", onRefresh)}>Bord</button>
        </div>
    );
}

export default TextBox;
