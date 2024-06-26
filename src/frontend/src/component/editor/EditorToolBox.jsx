import React, {useEffect, useState} from 'react';
import {editorSelection} from "../../App";
import {useBlockStore} from "./hooks/useBlockHooks";
import TextBox from "./text/TextBox";
import {createPortal} from "react-dom";
import TableToolBox from "./table/TableToolBox";

function EditorToolBox() {
    const [isShow, setIsShow] = useState(null);
    const [blockId, setBlockId] = useState(null);
    const blockStore = useBlockStore();
    const [offset,setOffset] = useState({x:0,y:0});

    useEffect(() => {
        const ToolBoxHandler = (e) => {

            if (editorSelection.isNullSelection()) return setIsShow(false);

            // 서로 다른 블럭 사이 셀렉션이라면 toolbox 비표시
            const {start: startNodeBlockId, end: endNodeBlockId} = editorSelection.getClosestId("block");
            if (startNodeBlockId !== endNodeBlockId) {
                setIsShow(false);
                return;
            }

            if (!editorSelection.isEditorLeaf()) return setIsShow(false);

            // 텍스트 toolBox
            const type = blockStore.getBlockType(startNodeBlockId);
            if (type === "text" || type === "ol" || type === "ul" || type === "cl") {
                if (!editorSelection.isCaret()) {
                    setIsShow("text");
                    setBlockId(startNodeBlockId);
                    const {right,top,left} = window.getSelection().getRangeAt(0).getBoundingClientRect();
                    setOffset({x : (left+right)/2, y : top + 35});
                } else {
                    setIsShow(null);
                    setBlockId(null);
                }
            }
            // 테이블 toolBox
            else if (type === "table") {
                if (!editorSelection.isSelectionSameElement()) {
                    setIsShow(null);
                    setBlockId(null);
                } else {
                    setIsShow("table");
                    setBlockId(startNodeBlockId);
                    const $cell = editorSelection.getClosestElement("cell").start;
                    const{right, top,left,height} = $cell.getBoundingClientRect();
                    setOffset({x : (left+right)/2, y : top + height });
                }
            }
        }

        document.addEventListener("selectionchange", ToolBoxHandler)

        return () => {
            document.removeEventListener("selectionchange", ToolBoxHandler);
        }
    }, [blockStore]);

    if (isShow === "text") {
        return createPortal(<TextBox targetBlockId={blockId} offset={offset}/>, document.body);
    } else if (isShow === "table") {
        return createPortal(<TableToolBox blockId={blockId} offset={offset}/>, document.body);
    }
    return null;
}

export default EditorToolBox;