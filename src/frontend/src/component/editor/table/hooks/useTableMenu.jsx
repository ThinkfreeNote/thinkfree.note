import {useContext, useLayoutEffect, useRef} from 'react';
import {TableMenuOffsetContext, TableMenuSetterContext} from "../contexts/TableMenuContextProvider";

/**
 * @desc 테이블 메뉴 조작 훅
 * @returns {{openMenu: function, isOpen: boolean, closeMenu: function}}
 */
function useTableMenu() {
    const {x, y, clearMenuOffset, setMenuOffset} = useTableMenuOffset();

    const closeMenu = () => {
        clearMenuOffset();
    }
    const openMenu = (x, y) => {
        setMenuOffset(x, y);
    }

    return {openMenu, closeMenu, isOpen: !(x === 0 && y === 0)}
}

/**
 * @desc 테이블 메뉴 Offset 조작 훅
 * @returns {{ x, y, setMenuOffset: function, clearMenuOffset: function}}
 */
function useTableMenuOffset() {
    const {x, y} = useContext(TableMenuOffsetContext);
    const dispatch = useContext(TableMenuSetterContext);

    if (!dispatch) return;
    const setMenuOffset = (x, y) => {
        dispatch({type: "updateOffset", x, y});
    }

    const clearMenuOffset = () => {
        dispatch({type: "clearOffset"});
    }

    return {x, y, setMenuOffset, clearMenuOffset}
}

export {
    useTableMenu, useTableMenuOffset
};