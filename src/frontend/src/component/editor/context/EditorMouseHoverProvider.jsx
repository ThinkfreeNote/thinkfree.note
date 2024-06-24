import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const EditorMouseHoverContext = createContext(null);
const EditorMouseHoverSetterContext = createContext(null);

export function EditorMouseHoverProvider({children}) {
    const [hoverBlockId, setHoverBlockId] = useState(null);

    const setHoverId = useMemo(()=>{
        return {
            setHoverBlockId
        }
    },[])
    return (
        <EditorMouseHoverContext.Provider value={hoverBlockId}>
            <EditorMouseHoverSetterContext.Provider value={setHoverId}>
            {children}
            </EditorMouseHoverSetterContext.Provider>
        </EditorMouseHoverContext.Provider>
    );
}

export function useMouseHoverBlockManager () {
    const mouseHoverBlockManager = useContext(EditorMouseHoverSetterContext);

    const setHoverBlockId = (blockId) => {
        mouseHoverBlockManager.setHoverBlockId(blockId);
    }
    const clearHoverBlockId = () => {
        mouseHoverBlockManager.setHoverBlockId(null);
    }

    return {
        setHoverBlockId, clearHoverBlockId
    }
}
export function useMouseHoverBlockId() {
    const hoverBlockId = useContext(EditorMouseHoverContext);
    return (hoverBlockId);

}

