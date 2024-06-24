import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const DragOverIdContext = createContext(null);
const DragOverIdManagerContext = createContext(null);

export function DragAndDropProvider({children}) {
    const [dragOverBlockId, setDragOverBlockId] = useState(null);
    const [dragStartBlockId, setDragStartBlockId] = useState(null);

    const dragOverIdManager = useMemo(() => {
        return {setDragOverBlockId, setDragStartBlockId}
    }, [])

    return <DragOverIdContext.Provider value={{dragOverBlockId, dragStartBlockId}}>
        <DragOverIdManagerContext.Provider value={dragOverIdManager}>
            {children}
        </DragOverIdManagerContext.Provider>
    </DragOverIdContext.Provider>
}

export function useDragOverBlockIdManager() {
    const dragOverIdManager = useContext(DragOverIdManagerContext);

    const setBlockId = (blockId) => {
        dragOverIdManager.setDragOverBlockId(blockId);
    }
    const clearBlockId = () => {
        dragOverIdManager.setDragOverBlockId(null);
        dragOverIdManager.setDragStartBlockId(null);
    }

    const setDragStartBlockId = (blockId) => {
        dragOverIdManager.setDragStartBlockId(blockId);
    }

    return {setBlockId, clearBlockId, setDragStartBlockId};
}

export function useDragOverBlockId() {
    const {dragOverBlockId, dragStartBlockId} = useContext(DragOverIdContext);

    if (!dragOverBlockId) return;
    return dragOverBlockId === dragStartBlockId ? null : dragOverBlockId;
}

