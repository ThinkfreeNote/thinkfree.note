import React, {useEffect, useState} from 'react';
import {ContextMenu} from "../common/ContextMenu";
import {useMenu} from "../common/MenuContext";
import {editorSelection} from "../../App";
import useBlockIdList from "./hooks/useBlockIdList";
import {useBlockStore} from "./hooks/useBlockHooks";

/**
 * @desc 슬래시로 블록 추가하는 컴포넌트 훅
 * @param editorRef 슬래시를 인식할 에디터
 * @returns {{slashComponent: (false|JSX.Element)}} 메뉴 오픈 시 슬래시 메뉴 반환
 */
function useSlash(editorRef) {
    const {openMenu, isOpen, closeMenu} = useMenu();
    const slashComponent = isOpen && <SlashMenu closeMenu={closeMenu} editorRef={editorRef}/>;

    useEffect(() => {
        if (!editorRef.current) return;
        const $editor = editorRef.current;

        const slashHandler = (e) => {
            if (e.data === "/") {
                const {right, bottom} = editorSelection.getBoundingRect();
                openMenu(right, bottom)
            } else {
                closeMenu();
            }
        }

        $editor.addEventListener("input", slashHandler);

        return () => {
            $editor.removeEventListener("input", slashHandler);
        }

    }, []);

    return {slashComponent}
}


const SLASH_ITEM_TYPES = [["텍스트블록","text"],["목록","list"],["표","table"]];

/**
 * @desc ContextMenu 기반의 슬래시 메뉴
 * @param closeMenu
 * @param editorRef
 * @returns {JSX.Element}
 * @constructor
 */
function SlashMenu({closeMenu, editorRef}) {
    const [menuIndex, setMenuIndex] = useState(0);

    const {addBlockId, getIndexOfBlock} = useBlockIdList();
    const blockStore = useBlockStore();

    const addBlock = (type) => {
        addBlockId(blockStore.createBlock(type).id, getIndexOfBlock(editorSelection.blockId[0]) + 1);
        closeMenu();
    }

    useEffect(() => {
        if (!editorRef.current) return;
        const $editor = editorRef.current;


        const keyDownHandler = (e) => {
            if (e.key === "Escape") {
                closeMenu();
            }
            if(e.key === "Enter") {
                e.preventDefault();
                menuIndex > 0 && addBlock(SLASH_ITEM_TYPES[menuIndex - 1][1]);
            }
            if (e.key.startsWith("Arrow")) {
                e.preventDefault();
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    setMenuIndex(prev => prev === SLASH_ITEM_TYPES.length ? prev : prev + 1);
                } else {
                    setMenuIndex(prev => prev === 0 ? prev : prev - 1);
                }
            }
        }

        $editor.addEventListener("keydown", keyDownHandler);

        return () => {
            $editor.removeEventListener("keydown", keyDownHandler);
        }

    }, [menuIndex]);

    return <ContextMenu closeMenu={closeMenu}>
        <ContextMenu.SubTitle text="기본 Blocks"/>
        <ContextMenu.Divider/>
        {SLASH_ITEM_TYPES.map((item,idx)=>{
            return <ContextMenu.Plain key={idx} isSelected={menuIndex === idx +1} handler={() => addBlock(item[1])} name={item[0]}/>
        })}
    </ContextMenu>
}

export default useSlash;