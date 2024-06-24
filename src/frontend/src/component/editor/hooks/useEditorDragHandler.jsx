import {useDragOverBlockIdManager} from "../context/DragAndDropProvider";
import useBlockIdList from "./useBlockIdList";



const getBlockId = (e) => e.target.closest("[data-block-id]")?.dataset.blockId;

/**
 * @desc 에디터 내 블록 드래그 앤 드롭을 처리하는 핸들러
 * @returns {{onDrop: function, onDragOver: function, onDragEnd: function, onDragStart: function}}
 */
function useEditorDragHandler() {
    const dragOverBlockIdManager = useDragOverBlockIdManager();
    const {getIndexOfBlock, moveBlock} = useBlockIdList()

    const onDragOver = (e) => {
        e.preventDefault();
        const blockId = getBlockId(e);
        if (!blockId) return;
        dragOverBlockIdManager.setBlockId(blockId);
    }

    const onDragStart = (e) => {
        const blockId = getBlockId(e);
        if (!blockId) return;
        e.dataTransfer.setData("blockId", `${blockId}`);
        e.dataTransfer.dropEffect = "copy"
        dragOverBlockIdManager.setDragStartBlockId(blockId);
    }

    const onDragEnd = (e) => {
        e.preventDefault();
        dragOverBlockIdManager.clearBlockId();
    }
    const onDrop = (e) => {
        const blockId = getBlockId(e);
        if (!blockId) return;
        e.preventDefault();
        dragOverBlockIdManager.clearBlockId();
        e.dataTransfer.dropEffect = "copy"
        const dragStartBlockId = e.dataTransfer.getData("blockId");
        if(dragStartBlockId === blockId) return;
        moveBlock(dragStartBlockId, getIndexOfBlock(blockId));
    }

    return {onDragOver, onDrop, onDragEnd,onDragStart}

}

export default useEditorDragHandler;