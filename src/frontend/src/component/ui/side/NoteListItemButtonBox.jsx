import React, {useState} from 'react';
import {createPortal} from "react-dom";
import DocumentMenu from "../menu/DocumentMenu";

import {ReactComponent as BookMarkIcon} from "../../../assets/icon_start.svg";
import {ReactComponent as MenuDotIcon} from "../../../assets/icon_menu_dot.svg";
import {ReactComponent as PlusIcon} from "../../../assets/icon_plus.svg";
import {ReactComponent as BookMarkFillIcon} from "../../../assets/icon_star_fill.svg";
import {useBookMark} from "../../context/BookMarkProvider";
import {useMenu} from "../menu/MenuContext";

/**
 * @desc 사이드 메뉴의 노트 아이템 버튼과 관련된 컴포넌트
 * @param noteId
 * @returns {JSX.Element}
 */
function NoteListItemButtonBox({noteId}) {
    return (
        <div className="noteList-item-menu-box">
            {/*<NoteListItemBookMarkButton noteId={noteId}/> /!* 북마크 *!/*/}
            <NoteListItemMenuButton noteId={noteId}/> {/* 메뉴 */}
            <NoteListItemPlusButton noteId={noteId}/> {/* Plus */}
        </div>
    );
}

// 북마크 버튼
function NoteListItemBookMarkButton({noteId}) {
    const {isBookMark, addBookMark, deleteBookMark} = useBookMark();
    
    const onClickBookMark = (e) => {
        return isBookMark(noteId) ? deleteBookMark(noteId) : addBookMark(noteId);
    }

    return <NoteListItemButton icon={isBookMark(noteId) ? <BookMarkFillIcon/> : <BookMarkIcon/>}
                               hoverIcon={<BookMarkFillIcon/>} onClick={onClickBookMark}/>
}


// 메뉴 버튼
function NoteListItemMenuButton({noteId}) {
    const {closeMenu, openMenu, isOpen} = useMenu();
    const onClickNoteItemMenu = (e) => {
        openMenu(e.clientX, e.clientY);
    }
    return (
        <>
            <NoteListItemButton icon={<MenuDotIcon/>} onClick={onClickNoteItemMenu}/>
            {isOpen && createPortal(<DocumentMenu closeMenu={closeMenu}
                                                  noteId={noteId}/>, document.body)}
        </>
    )
}

// Plus 버튼
function NoteListItemPlusButton({noteId}) {
    return <NoteListItemButton icon={<PlusIcon fill="black" width="1" height="1"/>}/>

}

// 버튼 메뉴 공통
function NoteListItemButton({icon, hoverIcon, onClick}) {
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

export default NoteListItemButtonBox;