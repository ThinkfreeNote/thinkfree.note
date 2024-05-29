import React, {useContext, useEffect} from 'react';
import {BlockStoreContext} from "../../container/NoteEditorContainer";
import {EditorContext} from "../NoteEditor";
import TextComponent from "./TextComponent";


function TextBlock({blockId}) {
    const blockStore = useContext(BlockStoreContext);
    const editorContext = useContext(EditorContext);
    const data = blockStore[blockId];
    console.log(data);

    // 인풋 이벤트가 발생한 노드 가져와서 blockStore에 저장
    useEffect(() => {
        if (!editorContext.current) return;

        const handler = (e) => {
            const element = window.getSelection().anchorNode.parentElement;
            blockStore[blockId].value = element.innerText;
            console.log(blockStore[blockId]);
        }

        editorContext.current.addEventListener("input", handler)

        return () => {
            editorContext.current.removeEventListener("input", handler)
        }
    }, [editorContext]);


    // 비어있는 블록
    if (data.contents.length === 0) {
        return (
            <>
                <p>&#xFEFF;</p>
            </>
        );
    } else {
        return (
            <TextComponent data={data}/>
        );
    }
}


export default TextBlock;