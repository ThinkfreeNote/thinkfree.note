import React from 'react';
import {useBlockData} from "../hooks/useBlockHooks";

function TextBox({targetBlockId, targetTextId, onRefresh}) {
    const textBlock = useBlockData(targetBlockId);
    const text = textBlock.getText(targetTextId);

    return (
        <p contentEditable={false} style={{userSelect: "none"}}>
            <button onClick={() => text.updateFontStyle("color", "black", onRefresh)}>black</button>
            <button onClick={() => text.updateFontStyle("color", "red", onRefresh)}>red</button>
            <button onClick={() => text.updateFontStyle("color", "orange", onRefresh)}>orange</button>
            <button onClick={() => text.updateFontStyle("color", "yellow", onRefresh)}>yellow</button>
            <button onClick={() => text.updateFontStyle("color", "green", onRefresh)}>green</button>
            <button onClick={() => text.updateFontStyle("color", "blue", onRefresh)}>blue</button>
            <button onClick={() => text.updateFontStyle("fontSize", 12, onRefresh)}>12</button>
            <button onClick={() => text.updateFontStyle("fontSize", 16, onRefresh)}>16</button>
            <button onClick={() => text.updateFontStyle("fontSize", 20, onRefresh)}>20</button>
            <button onClick={() => text.updateFontStyle("fontSize", 30, onRefresh)}>30</button>
            <button onClick={() => text.updateFontStyle("fontWeight", "bold", onRefresh)}>bold</button>
            <button onClick={() => text.updateFontStyle("fontStyle", "italic", onRefresh)}>italic</button>
            <button onClick={() => text.updateFontStyle("textDecoration", "underline", onRefresh)}>underline</button>
            <button onClick={() => text.updateFontStyle("textDecoration", "line-through", onRefresh)}>line-through
            </button>
        </p>
    );
}

export default TextBox;
