import React, {useContext, useEffect, useRef, useState} from 'react';
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {useBlockStore} from "../hooks/useBlockHooks";
import {useDialog} from "../context/EditorDialogProvider";

function CalcDialog({position,payload}) {
    const {top,left} = position;
    const {closeDialog} = useDialog();
    const {cellIds} = payload;

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
        else if(e.key === "Escape") {
            closeDialog();
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

export default CalcDialog;