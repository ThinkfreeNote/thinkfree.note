import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {ReactComponent as BookMarkIcon} from "../../assets/icon_start.svg";
import {ReactComponent as MenuDotIcon} from "../../assets/icon_menu_dot.svg";
import {ReactComponent as PlusIcon} from "../../assets/icon_plus.svg";
import {ReactComponent as BookMarkFillIcon} from "../../assets/icon_star_fill.svg";
import {NoteTitleContext} from "./context/NoteTitleProvider";

function NoteListNavigation({noteList}) {
    const {noteId} = useParams();

    return (
        <div className="noteList-nav">
            {noteList.map((item) => {
                return <NoteListItem key={item.id} id={item.id} title={item.title}
                                     isSelected={Number(noteId) === item.id}/>
            })}
            {!noteId && <NoteListNewItem/>}
        </div>
    );
}

function NoteListItem({id, title, isSelected}) {
    const {title : liveTitle,setTitle} = useContext(NoteTitleContext);
    
    // 현재 ID와 맞는 페이지의 title로 에디터의 타이틀 컴포넌트를 초기화 시켜주기 위함
    useEffect(() => {
        isSelected && setTitle(title);
    }, [title,isSelected]);
    return <Link to={`/${id}`} onClick={(e) => {
        // 메뉴 내의 버튼 클릭 시에는 페이지 이동이 발생하지 않도록
        if (e.target instanceof Element && e.target.closest("button")) {
            e.preventDefault();
        }
    }}>
        <div className={`noteList-item ${isSelected && "selected"}`}>
            <div className="noteList-item-marker">•</div>
            <div className="noteList-item-title">{isSelected? liveTitle : title}</div>
            <div className="noteList-item-menu-box">
                <NoteListItemButton icon={<BookMarkIcon/>} hoverIcon={<BookMarkFillIcon/>}/>
                <NoteListItemButton icon={<MenuDotIcon/>}/>
                <NoteListItemButton icon={<PlusIcon/>}/>
            </div>
        </div>
    </Link>
}

function NoteListNewItem() {
    const {setTitle} = useContext(NoteTitleContext);

    // 에디터 내의 타이틀 초기값이 ""으로 설정되게 하기 위함
    useEffect(()=>{
        setTitle("");
    },[])

    return <div className="noteList-item selected">
        <div className="noteList-item-marker">•</div>
        <div>새 노트 (작성 중)</div>
    </div>
}

function NoteListItemButton({icon, hoverIcon}) {
    const [isHover, setIsHover] = useState(false);

    const onHover = () => {
        setIsHover(true);
    }
    const onHoverOut = () => {
        setIsHover(false);
    }

    return <button onMouseOver={onHover} onMouseOut={onHoverOut}>
        {(hoverIcon && isHover) ? hoverIcon : icon}
    </button>
}

export default NoteListNavigation;