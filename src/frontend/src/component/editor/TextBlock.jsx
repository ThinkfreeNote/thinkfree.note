import React, {useContext, useEffect} from 'react';
import {BlockStoreContext} from "../container/NoteEditorContainer";
import {EditorContext} from "./NoteEditor";

// 폰트 스타일 적용 함수
const addFontStyles = (style) => {
    const fontStyles = {
        color: style.color,
        fontSize: style.size,
        fontFamily: style.fontFamily
    };

    if (style.type.includes('bold')) {
        fontStyles.fontWeight = 'bold';
    }
    if (style.type.includes('italic')) {
        fontStyles.fontStyle = 'italic';
    }
    // 밑줄 취소선 겹칠 경우 밑줄만 적용
    if (style.type.includes('underline') && style.type.includes('line-through')) {
        fontStyles.textDecoration = 'underline';
    } else if (style.type.includes('underline')) {
        fontStyles.textDecoration = 'underline';
    } else if (style.type.includes('line-through')) {
        fontStyles.textDecoration = 'line-through';
    }

    return fontStyles;
};


function TextBlock({blockId}) {
    const blockStore = useContext(BlockStoreContext);
    const editorContext = useContext(EditorContext);
    const data = blockStore[blockId];

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
            <>
                {data.contents.map((content, index) => (
                    <p key={index}
                       style={addFontStyles(content.style)}
                    >
                        {content.value}
                    </p>
                ))}
            </>
        );
    }
}


export default TextBlock;