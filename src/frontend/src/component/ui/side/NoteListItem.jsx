import React, {useContext, useEffect} from 'react';
import {NoteTitleContext} from "../../editor/context/NoteTitleProvider";
import {Link} from "react-router-dom";

import NoteListItemButtonBox from "./NoteListItemButtonBox";

function NoteListItem({id, title, isSelected}) {
    const {title: liveTitle, setTitle} = useContext(NoteTitleContext);

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
            <div className="noteList-item-title">{isSelected ? liveTitle : title}</div>
            <NoteListItemButtonBox noteId={id}/>
        </div>
    </Link>
}

export default NoteListItem;