import React, {useContext} from 'react';
import {ToolBox} from "../../common/ToolBox";
import {editorSelection} from "../../../App";
import {getCellIds, isCell} from "../../../utils/table";
import {useTableData} from "./hooks/useTableData";
import {BlockContext} from "../BlockContextProvider";

import {ReactComponent as BgColorIcon} from "../../../assets/icon_bgColor.svg";
import {ReactComponent as FontColorIcon} from "../../../assets/icon_fontColor.svg";
import {ReactComponent as BoldIcon} from "../../../assets/icon_bold.svg";

function TableToolBox() {
    const tableData = useTableData();
    const {reRender} = useContext(BlockContext);
    
    const toolHandler = (tableMethod) => {
        return (color) => {
            if (editorSelection.isNullSelection()) return;
            const $element = editorSelection.getElement().startElement;
            if (isCell($element)) {
                const {cellId, rowId} = getCellIds($element);
                tableMethod(rowId, cellId, color);
                reRender();
            }
        }
    }

    return (
        <ToolBox style={{left: "50%", top:"-10%"}}>
            <ToolBox.Color icon={<FontColorIcon/>} handler={toolHandler((rowId,cellId,color)=>{tableData.setCellColor(rowId,cellId,color)})}/>
            <ToolBox.Color icon={<BgColorIcon/>} handler={toolHandler((rowId,cellId,color)=>{tableData.setCellBackgroundColor(rowId,cellId,color)})}/>
            <ToolBox.Plain icon={<BoldIcon/>} handler={toolHandler((rowId,cellId)=>{tableData.toggleBold(rowId,cellId)})}/>
        </ToolBox>
    );
}

export default TableToolBox;