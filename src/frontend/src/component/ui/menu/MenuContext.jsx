import {createContext, useCallback, useContext, useState} from "react";

export const MenuContext = createContext(null);

export function MenuContextProvider({children}) {
    const [offset, setOffset] = useState({x: 0, y: 0});

    return <MenuContext.Provider value={{offset, setOffset}}>
        {children}
    </MenuContext.Provider>
}


/**
 * @desc 컨텍스트 메뉴 열고 닫기 위한 함수 제공
 * @returns {{openMenu: function, isOpen: boolean, closeMenu: function}}
 */
export function useMenu() {
    const {setOffset} = useContext(MenuContext);
    const [isOpen, setIsOpen] = useState(false);

    /**
     * @desc 메뉴를 뛰울 x, y 좌표
     * @param x
     * @param y
     */
    const openMenu = (x, y) => {
        setOffset({x, y});
        setIsOpen(true);
    }

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        setOffset({x:0,y:0});
    },[])

    return {isOpen, openMenu, closeMenu}
}

