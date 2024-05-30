import React, {useContext, useLayoutEffect, useRef} from 'react';
import {ReactComponent as ToggleOn} from "../../assets/toggle_icon_on.svg";
import {ReactComponent as HeaderIcon} from "../../assets/icon_header.svg";
import {MenuContext} from "./MenuContext";


function ContextMenuMain({children, closeMenu}) {
    const menuRef = useRef(null);
    const {offset, setOffset} = useContext(MenuContext);

    // 배경 클릭 시
    const overlayClickHandler = (e) => {
        if (e.target === menuRef.current || menuRef.current.contains(e.target)) return;
        // 메뉴 닫기
        closeMenu();
    }

    // 메뉴 박스가 화면 크기 넘어가는 경우 위치 재조정
    useLayoutEffect(() => {
        if (!menuRef.current) return;
        const innerWidth = window.innerWidth;
        const menuBoxWidth = menuRef.current.offsetWidth
        if (menuBoxWidth + offset.x > innerWidth) {

            setOffset({...offset, x: innerWidth - menuBoxWidth - 10});
        }
    }, [offset, setOffset]);


    return (
        <div onClick={overlayClickHandler} contentEditable={false} className="context-menu-overlay"
             style={{userSelect: "none"}}>
            <div ref={menuRef} className="context-menu" style={{top: offset.y, left: offset.x}}>
                {children}
            </div>
        </div>

    );
}

function ContextMenuItemPlain({name, handler, disable = false}) {
    return <div className={`context-menu-item ${disable && "context-menu-disable"}`} onClick={disable ? () =>{} : handler} style={{color : disable ? "grey" : "inherit"}}>{name}</div>
}

function ContextMenuItemToggle({name, handler}) {
    return <div className="context-menu-item" onClick={handler}>
        <HeaderIcon width="24px" height="24px"/>
        <span>{name}</span>
        <ToggleOn width="24px" height="24px" style={{marginLeft: "auto"}}/>
    </div>
}

function ContextMenuItemDivider() {
    return <hr style={{margin:"0 10px"}}></hr>
}

/**
 * @desc ContextMenu UI
 * @desc 합성 컴포넌트 패턴을 적용하여 재사용성 향상
 * @property Plain 기본 메뉴 아이템
 * @property Toggle 토글 메뉴 아이템
 * @property Divider 구분선
 * @see https://fe-developers.kakaoent.com/2022/220731-composition-component/
 */
export const ContextMenu = Object.assign(ContextMenuMain, {
    Plain: ContextMenuItemPlain,
    Toggle: ContextMenuItemToggle,
    Divider : ContextMenuItemDivider
})