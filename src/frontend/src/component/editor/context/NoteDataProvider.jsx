import React, {createContext, useEffect, useRef, useState} from 'react';
import {BlockStore} from "../../../model/BlockStore";
import {useNavigate} from "react-router-dom";
import {jsonToBlockStore} from "../../../utils/json";


export const BlockStoreContext = createContext(null);
export const BlockIdListContext = createContext(null);

/**
 * @desc noteContents, blockStore 관리
 * @param noteId
 * @param children
 * @returns {JSX.Element}
 */
function NoteDataProvider({children, noteId}) {
    const [blockIdList, setBlockIdList] = useState([]);
    const blockStore = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!blockStore.current) return
        window.blockStore = blockStore.current;
    }, [blockIdList]);

    useEffect(() => {
        // noteId 없으면 새 노트
        if (!noteId) {
            blockStore.current = new BlockStore();
            const firstBlock = blockStore.current.createNewBlock("text");
            setBlockIdList([firstBlock.id]);
        }
        // noteId 있을 때는 데이터 불러와서 파싱
        else {
            fetchDocument(`/${noteId}`).then((data) => {
                const {blocks, blockIdList} = jsonToBlockStore(data.content);
                blockStore.current = blocks;
                setBlockIdList([...blockIdList]);
            }).catch(e => {
                console.log(e);
                navigate("/")
            });
        }
    }, []);

    if (blockIdList.length === 0) return null;

    return (
        <BlockIdListContext.Provider value={{blockIdList, setBlockIdList}}>
            <BlockStoreContext.Provider value={blockStore}>
                {children}
            </BlockStoreContext.Provider>
        </BlockIdListContext.Provider>
    );
}


/**
 * @desc `http://localhost:8080/documents`에 대한 fetch 요청
 * @param url
 * @param option
 * @returns {Promise<any>}
 */
function fetchDocument(url, option) {
    return fetch(`http://localhost:8080/documents${url}`, {
        ...option,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
}


/**
 * @desc NoteDataContext 조작하는 함수
 * @returns {{updateNote: function, saveNote: function}}
 */
export function useNoteDataFetch() {
    const navigate = useNavigate();

    const saveNote = (title, note) => {
        fetchDocument("", {
            method: "POST",
            body: JSON.stringify({
                title: title.length === 0 ? "Untitled" : title,
                content: JSON.stringify(note)
            }),
        }).then(data => navigate(`/${data}`));
    }

    const updateNote = (id, title, note) => {
        fetchDocument("", {
            method: "PATCH",
            body: JSON.stringify({
                id: id,
                title: title.length === 0 ? "Untitled" : title,
                content: JSON.stringify(note),
            }),
        }).then(data => console.log(data))
    }

    return {saveNote, updateNote}
}




export default NoteDataProvider;