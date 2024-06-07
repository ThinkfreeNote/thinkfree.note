import React, {useContext, useEffect, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import {EditorContext} from "./NoteEditor";
import {editorSelection} from "../../App";
import {useBlockStore} from "./hooks/useBlockHooks";
import {getCellIds} from "../../utils/table";
import {BlockReRenderContext} from "./context/BlockReRenderContext";

function CommandWindow() {
    const $editor = useContext(EditorContext);
    const blockStore = useBlockStore();
    const [isShow, setIsShow] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [cellIds, setCellIds] = useState(null);

    useEffect(() => {
        const tableCalcCommand = (e) => {
            if (editorSelection.isNullSelection()) return;
            if (e.data === "=") {
                const blockId = editorSelection.getClosestId("block").start;
                if (blockStore.getBlockType(blockId) === "table") {
                    setIsShow(true);
                    const {right, bottom} = window.getSelection().getRangeAt(0).getBoundingClientRect();
                    setTop(bottom);
                    setLeft(right);
                    setCellIds(getCellIds(editorSelection.getClosestElement("cell").start));
                }
            } else {
                setIsShow(false);
            }

        }
        if (!$editor.current) return;

        $editor.current.addEventListener("input", tableCalcCommand);
        return () => {
            if (!$editor.current) return;

            $editor.current.removeEventListener("input", tableCalcCommand);
        }
    }, []);


    return isShow && createPortal(<CalcDialog cellIds={cellIds} top={top} left={left}
                                              closeDialog={() => setIsShow(false)}/>, document.body)
}


function CalcDialog({top, left, closeDialog,cellIds}) {

    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const [value, setValue] = useState("");
    const overlayRef = useRef(null);
    const inputRef = useRef(null);
    const tableData = useBlockStore().getBlock(cellIds.blockId);

    const close = (e) => {
        e.target === overlayRef.current && closeDialog();
    }

    const keyDownHandler = (e) => {
        if (e.key === "Enter") {
            // 정규식 통과하면 적용하도록 추가
            tableData.updateCell(cellIds.rowId,cellIds.cellId,inputRef.current.value);
            closeDialog();
            setReRenderTargetId(cellIds.blockId);
        }
    }
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return <div ref={overlayRef} className="command-window-overlay" onClick={close}>
        <div className="command-window" style={{top, left}}>
            <label>계산 함수</label>
            <input ref={inputRef} type="text" value={"=" + value} onChange={(e) => {
                setValue(e.target.value.replace("=", ""))
            }} onKeyDown={keyDownHandler}/>
        </div>
    </div>
}

export default CommandWindow;