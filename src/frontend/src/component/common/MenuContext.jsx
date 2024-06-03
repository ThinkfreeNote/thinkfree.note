import {createContext, useContext, useState} from "react";

export const MenuContext = createContext(null);

export function MenuContextProvider({children}) {
    const [offset, setOffset] = useState({x:0,y:0});

    return <MenuContext.Provider value={{offset, setOffset}}>
        {children}
    </MenuContext.Provider>
}


export function useMenu() {
    const { setOffset} =  useContext(MenuContext);
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = (x,y) => {
        setOffset({x, y});
        setIsOpen(true);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return {isOpen, openMenu, closeMenu}
}

