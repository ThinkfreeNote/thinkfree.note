import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useBlockStore} from "./hooks/useBlockHooks";
import {EditorContext} from "./NoteEditor";
import {NoteTitleContext} from "./context/NoteTitleProvider";

function Title() {
    const blockStore = useBlockStore();
    const titleRef = useRef(null);
    const editorRef = useContext(EditorContext);
    const {title,setTitle} = useContext(NoteTitleContext);
    const [text, setText] = useState(null);

    useEffect(() => {
        const titleHandler = () => {
            setTitle(titleRef.current.textContent);
        }
        const $editor = editorRef.current;
        if(!$editor) return;
        $editor.addEventListener("input",titleHandler);
        return () => {
            $editor.removeEventListener("input",titleHandler);
        }
    }, [blockStore,titleRef,editorRef]);

    // 최초에만 title 상태값에 의존하고 이후 렌더링에서는 title 상태값에 의존하지 않게 하기 위함
    useEffect(()=>{
        if(text === null && title !== null) {
            setText(title);
        }
    },[title])


    if(!blockStore) return null;
    return (
        <h1 ref={titleRef} data-block-type="title" className="title">
            {text}
        </h1>
    );
}

export default Title;