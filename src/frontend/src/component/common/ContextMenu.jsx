import React, {useContext, useLayoutEffect, useRef, useState} from 'react';
import {MenuContext} from "./MenuContext";

// 아이콘 에셋
import {ReactComponent as ToggleOn} from "../../assets/icon_check.svg";
import {ReactComponent as ArrowRightIcon} from "../../assets/icon_arrow_right.svg";

function ContextMenuMain({children, closeMenu}) {
    const menuRef = useRef(null);
    const {offset, setOffset} = useContext(MenuContext);

    // 배경 클릭 시
    const overlayClickHandler = (e) => {
        if (e.target === menuRef.current || menuRef.current.contains(e.target)) return;
        // 메뉴 닫기
        closeMenu();
        e.stopPropagation();
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

// 기본 메뉴 아이템
function ContextMenuItemPlain({name, handler, disable = false}) {
    return <div className={`context-menu-item ${disable && "context-menu-disable"}`} onClick={disable ? () => {
    } : handler} style={{color: disable ? "grey" : "inherit"}}>{name}</div>
}

// 토글 메뉴 아이템
function ContextMenuItemToggle({name, handler, init = false}) {
    const [on, setOn] = useState(init);
    return <div className="context-menu-item" onClick={() => {
        handler()
        setOn(!on);
    }}>
        <span>{name}</span>
        {on && <ToggleOn width="24px" height="24px" style={{marginLeft: "auto"}}/>}
    </div>
}

// 구분선
function ContextMenuItemDivider() {
    return <hr style={{margin: "0 10px"}}></hr>
}

//
function ContextMenuItemDropDown({children, name}) {
    return <div className="context-menu-item context-menu-dropDown" style={{position: "relative"}}>
        <span>{name}</span>
        <ArrowRightIcon width="18" height="18" style={{marginLeft: "auto"}}/>
        <div style={{position: "absolute", transform: "translateX(90%)"}} className="context-menu">
            {children}
        </div>
    </div>
}

function ContextMenuSubTitle({text}) {
    return <div style={{fontSize:"12px", color:"grey", background : "none", cursor:"initial", padding : ".5em 1em"} } className="context-menu-item">{text}</div>
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
    Divider: ContextMenuItemDivider,
    DropDown: ContextMenuItemDropDown,
    SubTitle : ContextMenuSubTitle,
})