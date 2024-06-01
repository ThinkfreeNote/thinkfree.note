import React, {useState} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";

function TextBox({targetBlockId, targetTextId, onRefresh}) {
    const textBlock = useBlockData(targetBlockId);
    const text = textBlock.getText(targetTextId);

    return (
        <div contentEditable={false} style={{userSelect: "none"}}>
            <button onClick={() => text.updateFontStyle("color", "blue", onRefresh)}>blue</button>
            <button onClick={() => text.updateFontStyle("fontSize", 15, onRefresh)}>size</button>
            <button onClick={() => text.updateFontStyle("fontWeight", "bold", onRefresh)}>bold</button>
            <button onClick={() => text.updateFontStyle("fontStyle", "italic", onRefresh)}>italic</button>
            <button onClick={() => text.updateFontStyle("textDecoration", "underline", onRefresh)}>underline</button>
            <button onClick={() => text.updateFontStyle("textDecoration", "line-through", onRefresh)}>line-through</button>
            <button onClick={() => text.updateFontStyle("textDecoration", "underline", onRefresh)}>underline</button>
        </div>
    );
}

export default TextBox;
