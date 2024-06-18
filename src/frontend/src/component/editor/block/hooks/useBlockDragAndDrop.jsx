import {useState} from "react";
import useBlockIdList from "../../hooks/useBlockIdList";

function useBlockDragAndDrop(blockId) {
    const [isDragOver, setIsDragOver] = useState(false);
    const {getIndexOfBlock, moveBlock} = useBlockIdList()

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        e.dataTransfer.dropEffect = "copy"
        const dragStartBlockId = e.dataTransfer.getData("blockId");
        moveBlock(dragStartBlockId, getIndexOfBlock(blockId));
    }
    const onDragStart = (e) => {
        e.dataTransfer.setData("blockId", `${blockId}`);
        e.dataTransfer.dropEffect = "copy"
    }
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    }
    const onDragEnter = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    }

    const onDragLeave = (e) => {
        setIsDragOver(false);
    }

    return {onDrop, onDragLeave, onDragStart, onDragOver, onDragEnter, isDragOver};
}

export default useBlockDragAndDrop;