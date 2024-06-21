import React, {useContext, useEffect, useRef, useState} from 'react';
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {useDialog} from "../context/EditorDialogProvider";
import {useCell} from "./hooks/useTableData";

function CalcDialog({position,payload}) {
    const {top,left} = position;
    const {closeDialog} = useDialog();
    const {cellIds : {rowId, cellId,blockId }} = payload;

    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const [value, setValue] = useState("");
    const overlayRef = useRef(null);
    const inputRef = useRef(null);
    const cellModel = useCell(blockId,rowId,cellId);

    const close = (e) => {
        e.target === overlayRef.current && closeDialog();
    }

    const keyDownHandler = (e) => {
        if (e.key === "Enter") {
            cellModel.text = inputRef.current.value;
            closeDialog();
            setReRenderTargetId(blockId);
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