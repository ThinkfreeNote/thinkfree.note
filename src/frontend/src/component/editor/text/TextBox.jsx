import React, {useContext} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";
import {editorSelection} from "../../../App";
import {ToolBox} from "../../common/ToolBox";
import {ReactComponent as FontColorIcon} from "../../../assets/icon_fontColor.svg";
import {ReactComponent as BoldIcon} from "../../../assets/icon_bold.svg";
import {ReactComponent as ItalicIcon} from "../../../assets/icon_italic.svg";
import {ReactComponent as UnderlineIcon} from "../../../assets/icon_underline.svg";
import {ReactComponent as LineThroghIcon} from "../../../assets/icon_lineThrough.svg";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {Text} from "../../../model/Text";
import {getRandomId} from "../../../utils/id";
import {FontStyle} from "../../../model/FontStyle";


const FONT_SIZE_LIST = [8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48];

function TextBox({targetBlockId, offset}) {
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const textBlock = useBlockData(targetBlockId);

    function updateFontStyles(styleName, value) {
        const textIds = editorSelection.getClosestId("text");
        let startIdx = textBlock.getTextIdx(textIds.start);
        let endIdx = textBlock.getTextIdx(textIds.end);
        const isMultiSelectedText = startIdx !== endIdx;

        // 여러 텍스트가 셀랙션 되었으면 분리
        if (isMultiSelectedText) {
            const dividedTextValues = editorSelection.getDividedMultiTextContents();

            if (dividedTextValues.startNode[0] !== "") {
                textBlock.divideText(startIdx, dividedTextValues.startNode[0], dividedTextValues.startNode[1]);
                startIdx++;
                endIdx++;
            }

            if (dividedTextValues.endNode[1] !== "") {
                textBlock.divideText(endIdx, dividedTextValues.endNode[0], dividedTextValues.endNode[1]);
            }
        } else {
            const dividedTextValues = editorSelection.getDividedTextContents();
            const cnt = textBlock.divideText(startIdx, dividedTextValues.before, dividedTextValues.selected, dividedTextValues.after);

            startIdx += cnt - 1;
            if (dividedTextValues.after === "") startIdx++;
            endIdx = startIdx;
        }

        // FontStyle Update
        for (let i = startIdx; i <= endIdx; i++) {
            const curText = textBlock.getTextFromIdx(i);
            curText.updateFontStyle(styleName, value, isMultiSelectedText);
        }

        // 리렌더링
        setReRenderTargetId(targetBlockId);
        window.getSelection().removeAllRanges();
    }

    const colorUpdate = (color) => {
        updateFontStyles("color", color);
    }

    const styleUpdate = (type) => {
        updateFontStyles("textDecoration", type)
    }

    return (
        <ToolBox top={offset.y} left={offset.x}>
            <ToolBox.Color icon={<FontColorIcon/>} handler={colorUpdate}/>
            <ToolBox.Plain icon={<BoldIcon/>} handler={() => updateFontStyles("fontWeight", "bold")}/>
            <ToolBox.Plain icon={<ItalicIcon/>} handler={() => updateFontStyles("fontStyle", "italic")}/>
            <ToolBox.Plain icon={<UnderlineIcon/>} handler={() => styleUpdate("underline")}/>
            <ToolBox.Plain icon={<LineThroghIcon/>} handler={() => styleUpdate("line-through")}/>
            <ToolBox.DropDownBox handler={(value) => updateFontStyles("fontSize", `${value}px`)}>
                {FONT_SIZE_LIST.map((fontSize) => <ToolBox.DropDownItem key={fontSize} value={fontSize} unit={"px"}/>)}
            </ToolBox.DropDownBox>
        </ToolBox>
    )
}

export default TextBox;
