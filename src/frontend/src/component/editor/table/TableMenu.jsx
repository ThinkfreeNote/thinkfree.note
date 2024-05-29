import React, {useLayoutEffect, useRef} from 'react';
import {useTableMenu, useTableMenuOffset} from "./hooks/useTableMenu";

function TableMenu(props) {
    const menuRef = useRef(null);
    const {closeMenu, isOpen} = useTableMenu();
    const {x,y, setMenuOffset} = useTableMenuOffset();

    // 배경 클릭 시
    const overlayClickHandler = (e) => {
        if(e.target === menuRef.current || menuRef.current.contains(e.target)) return;
        // 메뉴 닫기
        closeMenu();
    }

    // 메뉴 박스가 화면 크기 넘어가는 경우 위치 재조정
    useLayoutEffect(() => {
        if (!menuRef.current) return;
        const innerWidth = window.innerWidth;
        const menuBoxWidth = menuRef.current.offsetWidth
        if (menuBoxWidth + x > innerWidth) {
            setMenuOffset(innerWidth - menuBoxWidth - 10);
        }
    }, [x, y, setMenuOffset]);


    if (!isOpen) return;
    return (
        <div onClick={overlayClickHandler} contentEditable={false} className="table-menu-overlay"
             style={{userSelect: "none"}}>
            <div ref={menuRef} className="table-menu" style={{top: y, left: x}}>
                <div className="table-menu-item">헤더 설정</div>
                <div className="table-menu-item">행 추가</div>
                <div className="table-menu-item">행 삭제</div>
                <div className="table-menu-item">계산 함수</div>
            </div>
        </div>
    )
}

export default TableMenu;