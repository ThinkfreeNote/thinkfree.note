import React, {useContext, useEffect} from 'react';
import {NoteTitleContext} from "../../editor/context/NoteTitleProvider";

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

export default NoteListNewItem;