import React, {createContext, useCallback, useContext, useState} from 'react';
import {createPortal} from "react-dom";
import Dialog from "../../ui/Dialog";

const DialogContext = createContext(null);
const DialogManager = createContext(null);

const initPosition = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

/**
 * @desc 에디터 내에서 사용하는 다이얼로그들 관련 Context Provider
 * @desc ex) 계산함수 창
 * @param children
 * @returns {JSX.Element} children
 */
export function EditorDialogProvider({children}) {
    const [position, setPosition] = useState(initPosition);
    const [type, setType] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [payload, setPayload] = useState(null);

    return (
        <DialogContext.Provider value={{position, type, payload}}>
            <DialogManager.Provider value={{setPosition, setType, setIsOpen, setPayload}}>
                {isOpen && createPortal(<Dialog type={type} payload={payload} position={position}/>, document.body)}
                {children}
            </DialogManager.Provider>
        </DialogContext.Provider>
    );
}


export function useDialog() {
    const {setPosition, setType, setIsOpen, setPayload} = useContext(DialogManager);

    const openDialog = useCallback((position, type, payload) => {
        const {top, bottom, left, right} = position;
        setType(type);
        setPosition({
            top: top ?? 0,
            bottom: bottom ?? 0,
            left: left ?? 0,
            right: right ?? 0
        })
        setIsOpen(true);
        setPayload(payload);
    }, [setPosition, setType, setIsOpen, setPayload])

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen])

    return {openDialog, closeDialog}
}

