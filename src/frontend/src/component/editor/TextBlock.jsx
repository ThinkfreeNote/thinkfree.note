import React, {useContext, useEffect} from 'react';
import {EditorContext} from "./NoteEditor";
import {BlockStoreContext} from "./context/BlockIdListProvider";


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
            // console.log(blockStore[blockId]);
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
                <p data-leaf={true}>&#xFEFF;</p>
            </>
        );
    } else {
        return (
            <>
                {data.contents.map((content, index) => (
                    <p data-leaf={true} key={index}
                       style={{...content.fontStyle}}
                    >
                        {content.value}
                    </p>
                ))}
            </>
        );
    }
}


export default TextBlock;