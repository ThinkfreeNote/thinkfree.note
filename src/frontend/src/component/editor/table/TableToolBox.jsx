import React, {useContext} from 'react';
import {ToolBox} from "../../common/ToolBox";
import {editorSelection} from "../../../App";
import {getCellIds, isCell} from "../../../utils/table";

import {ReactComponent as BgColorIcon} from "../../../assets/icon_bgColor.svg";
import {ReactComponent as FontColorIcon} from "../../../assets/icon_fontColor.svg";
import {ReactComponent as BoldIcon} from "../../../assets/icon_bold.svg";
import {useBlockData} from "../hooks/useBlockHooks";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {useSelectionManager} from "../../context/SelectionManagerProvider";

function TableToolBox({blockId, offset}) {
    const tableData = useBlockData(blockId);

    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const {setEditorCaretPosition} = useSelectionManager();

    /**
     * @param {function(Cell,string) : void} tableMethod
     * @returns {(function(string): void)}
     */
    const toolHandler = (tableMethod) => {
        return (color) => {
            if (editorSelection.isNullSelection()) return;
            const $element = editorSelection.getElement().startElement;
            if (isCell($element)) {
                const {cellId, rowId} = getCellIds($element);
                const cell = tableData.getRow(rowId).getCell(cellId);
                tableMethod(cell, color);
                setReRenderTargetId(blockId);
                setEditorCaretPosition(blockId, editorSelection.startBlockOffset, editorSelection.startOffset, "table");
            }
        }
    }

    return (
        <ToolBox top={offset.y} left={offset.x}>
            <ToolBox.Color icon={<FontColorIcon/>} handler={toolHandler((cell, color) => {
                cell.fontColor = color
            })}/>
            <ToolBox.Color icon={<BgColorIcon/>} handler={toolHandler((cell, color) => {
                cell.updateBgColor(color)
            })}/>
            <ToolBox.Plain icon={<BoldIcon/>} handler={toolHandler((cell) => {
                cell.toggleBold()
            })}/>
        </ToolBox>
    );
}

export default TableToolBox;