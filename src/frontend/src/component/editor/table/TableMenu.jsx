import React, {useRef} from 'react';
import useTableMenu from "./hooks/useTableMenu";

function TableMenu(props) {
    const {menuRef,offset,closeMenu, isOpen : isMenuOpen} = useTableMenu();
    const overlayRef = useRef(null);

    const overlayClickHandler = (e) => {
        // 배경 선택 시 메뉴 창 닫기
        overlayRef.current === e.target && closeMenu();
    }

    if (!isMenuOpen) return;
    return (
        <div ref={overlayRef} onClick={overlayClickHandler} contentEditable={false} className="table-menu-overlay"
             style={{userSelect: "none"}}>
            <div ref={menuRef} className="table-menu" style={{top: offset.y, left: offset.x}}>
                <div className="table-menu-item">헤더 설정</div>
                <div className="table-menu-item">행 추가</div>
                <div className="table-menu-item">행 삭제</div>
                <div className="table-menu-item">계산 함수</div>
            </div>
        </div>
    )
}

export default TableMenu;