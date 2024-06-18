import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const DragOverIdContext = createContext(null);
const DragOverIdManagerContext = createContext(null);

export function DragAndDropProvider({children}) {
    const [dragOverBlockId, setDragOverBlockId] = useState(null);


    const dragOverIdManager = useMemo(() => {
        return {setDragOverBlockId}
    }, [])

    return <DragOverIdContext.Provider value={dragOverBlockId}>
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
    }

    return {setBlockId, clearBlockId};
}

export function useDragOverBlockId() {
    const dragOverBlockId = useContext(DragOverIdContext);

    if (!dragOverBlockId) return;
    return dragOverBlockId
}

