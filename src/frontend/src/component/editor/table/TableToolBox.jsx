import React, {useContext} from 'react';
import {ToolBox} from "../../common/ToolBox";
import {editorSelection} from "../../../App";
import {getCellIds, isCell} from "../../../utils/table";

import {ReactComponent as BgColorIcon} from "../../../assets/icon_bgColor.svg";
import {ReactComponent as FontColorIcon} from "../../../assets/icon_fontColor.svg";
import {ReactComponent as BoldIcon} from "../../../assets/icon_bold.svg";
import {useBlockData} from "../hooks/useBlockHooks";
import {BlockReRenderContext} from "../context/BlockReRenderContext";

function TableToolBox({blockId, offset}) {
    const tableData = useBlockData(blockId);
    const {setReRenderTargetId} = useContext(BlockReRenderContext);


    const toolHandler = (tableMethod) => {
        return (color) => {
            if (editorSelection.isNullSelection()) return;
            const $element = editorSelection.getElement().startElement;
            if (isCell($element)) {
                const {cellId, rowId} = getCellIds($element);
                tableMethod(rowId, cellId, color);
                setReRenderTargetId(blockId);
            }
        }
    }

    return (
        <ToolBox top={offset.y} left={offset.x}>
            <ToolBox.Color icon={<FontColorIcon/>} handler={toolHandler((rowId,cellId,color)=>{tableData.setCellColor(rowId,cellId,color)})}/>
            <ToolBox.Color icon={<BgColorIcon/>} handler={toolHandler((rowId,cellId,color)=>{tableData.setCellBackgroundColor(rowId,cellId,color)})}/>
            <ToolBox.Plain icon={<BoldIcon/>} handler={toolHandler((rowId,cellId)=>{tableData.toggleBold(rowId,cellId)})}/>
        </ToolBox>
    );
}

export default TableToolBox;