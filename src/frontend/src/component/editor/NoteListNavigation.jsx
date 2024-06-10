import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {ReactComponent as BookMarkIcon} from "../../assets/icon_start.svg";
import {ReactComponent as MenuDotIcon} from "../../assets/icon_menu_dot.svg";
import {ReactComponent as PlusIcon} from "../../assets/icon_plus.svg";
import {ReactComponent as BookMarkFillIcon} from "../../assets/icon_star_fill.svg";
import {NoteTitleContext} from "./context/NoteTitleProvider";
import {useMenu} from "../common/MenuContext";
import {createPortal} from "react-dom";
import DocumentMenu from "../DocumentMenu";
import {useBookMark} from "../context/BookMarkProvider";

function NoteListNavigation({noteList}) {
    const {noteId} = useParams();
    const location = useLocation();
    const {isBookMark} = useBookMark();

    return (
        <div className="noteList-nav">
            <h3>Favorites⭐</h3>
            {noteList.map((item) => {
                if(!isBookMark(item.id)) return;
                return <NoteListItem key={item.id} id={item.id} title={item.title}
                                     isSelected={Number(noteId) === item.id}/>
            })}
            <hr/>
            <h3>Note List</h3>
            {noteList.map((item) => {
                if(!isBookMark(item.id))
                return <NoteListItem key={item.id} id={item.id} title={item.title}
                                     isSelected={Number(noteId) === item.id}/>
            })}
            {location.pathname === "/new" && <NoteListNewItem/>}
        </div>
    );
}

function NoteListItem({id, title, isSelected}) {
    const {title: liveTitle, setTitle} = useContext(NoteTitleContext);
    const {closeMenu, openMenu, isOpen} = useMenu();
    const {isBookMark, addBookMark,deleteBookMark} = useBookMark();

    const bookMarkHandler = () => {
        return isBookMark(id) ? deleteBookMark(id) : addBookMark(id);
    }

    // 현재 ID와 맞는 페이지의 title로 에디터의 타이틀 컴포넌트를 초기화 시켜주기 위함
    useEffect(() => {
        isSelected && setTitle(title);
    }, [title, isSelected]);

    return <Link draggable={false} to={`/${id}`} onClick={(e) => {
        // 메뉴 내의 버튼 클릭 시에는 페이지 이동이 발생하지 않도록
        if (e.target instanceof Element && e.target.closest("button")) {
            e.preventDefault();
        }
    }}>
        <div className={`noteList-item ${isSelected && "selected"}`}>
            <div className="noteList-item-marker">•</div>
            <div className="noteList-item-title">{isSelected ? liveTitle : title}</div>
            <div className="noteList-item-menu-box">
                <NoteListItemButton icon={isBookMark(id) ? <BookMarkFillIcon/> : <BookMarkIcon/>} hoverIcon={<BookMarkFillIcon/>} onClick={bookMarkHandler}/>
                <NoteListItemButton icon={<MenuDotIcon/>} onClick={(e)=>{
                    openMenu(e.clientX,e.clientY);
                }}/>
                {isOpen && createPortal(<DocumentMenu closeMenu={closeMenu} noteId={id}/>,document.body)}
                <NoteListItemButton icon={<PlusIcon fill="black" width="1" height="1"/>}/>
            </div>
        </div>
    </Link>
}

function NoteListNewItem() {
    const {setTitle} = useContext(NoteTitleContext);

    // 에디터 내의 타이틀 초기값이 ""으로 설정되게 하기 위함
    useEffect(() => {
        setTitle("");
    }, [])

    return <div className="noteList-item selected">
        <div className="noteList-item-marker">•</div>
        <div>새 노트 (작성 중)</div>
    </div>
}

function NoteListItemButton({icon, hoverIcon,onClick}) {
    const [isHover, setIsHover] = useState(false);

    const onHover = () => {
        setIsHover(true);
    }
    const onHoverOut = () => {
        setIsHover(false);
    }

    return <button onClick={onClick} onMouseOver={onHover} onMouseOut={onHoverOut}>
        {(hoverIcon && isHover) ? hoverIcon : icon}
    </button>
}

export default NoteListNavigation;