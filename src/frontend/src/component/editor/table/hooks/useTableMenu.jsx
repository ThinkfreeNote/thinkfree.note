import {useContext, useLayoutEffect, useRef} from 'react';
import {TableMenuOffsetContext, TableMenuSetterContext} from "../contexts/TableMenuContextProvider";

function UseTableMenu(props) {
    const {x, y} = useContext(TableMenuOffsetContext);
    const dispatch = useContext(TableMenuSetterContext);
    const menuRef = useRef(null);

    const closeMenu = () => {
        dispatch({type :"clearOffset"})
    }

    // 메뉴 박스가 화면 크기 넘어가는 경우 위치 재조정
    useLayoutEffect(() => {
        if(!menuRef.current) return;
        const innerWidth = window.innerWidth;
        const menuBoxWidth =menuRef.current.offsetWidth
        if(menuBoxWidth + x > innerWidth) {
            dispatch({type : "updateOffset", x : innerWidth - menuBoxWidth - 10});
        }
    }, [x,y, dispatch]);

    return {closeMenu, menuRef, offset : {x,y}, isOpen : !(x === 0 && y === 0)}
}

export default UseTableMenu;