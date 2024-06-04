import React from 'react';
import {useBlockData} from "../hooks/useBlockHooks";
import {editorSelection} from "../../../App";

function TextBox({targetBlockId, onRefresh}) {
    const textBlock = useBlockData(targetBlockId);

    function updateFontStyles(styleName, value) {
        const textIds = editorSelection.getClosestId("text");
        let startIdx = textBlock.getTextIdx(textIds.start);
        let endIdx = textBlock.getTextIdx(textIds.end);
        const offset = editorSelection.getSelectOffset();

        for (let i = startIdx; i <= endIdx; i++) {
            const curText = textBlock.getTextFromIdx(i);
            curText.updateFontStyle(styleName, value);
        }

        onRefresh();
    }
    
    return (
        <div contentEditable={false} style={{userSelect: "none"}}>
            <button onClick={() => updateFontStyles("color", "black")}>black</button>
            <button onClick={() => updateFontStyles("color", "red")}>red</button>
            <button onClick={() => updateFontStyles("color", "orange")}>orange</button>
            <button onClick={() => updateFontStyles("color", "yellow")}>yellow</button>
            <button onClick={() => updateFontStyles("color", "green")}>green</button>
            <button onClick={() => updateFontStyles("color", "blue")}>blue</button>
            <button onClick={() => updateFontStyles("fontSize", 12)}>12</button>
            <button onClick={() => updateFontStyles("fontSize", 16)}>16</button>
            <button onClick={() => updateFontStyles("fontSize", 20)}>20</button>
            <button onClick={() => updateFontStyles("fontSize", 30)}>30</button>
            <button onClick={() => updateFontStyles("fontWeight", "bold")}>bold</button>
            <button onClick={() => updateFontStyles("fontStyle", "italic")}>italic</button>
            <button onClick={() => updateFontStyles("textDecoration", "underline")}>underline</button>
            <button onClick={() => updateFontStyles("textDecoration", "line-through")}>line-through</button>
        </div>
    );
}

export default TextBox;
