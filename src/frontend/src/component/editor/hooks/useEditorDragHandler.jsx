import {useDragOverBlockIdManager} from "../context/DragAndDropProvider";
import useBlockIdList from "./useBlockIdList";
import {useBlockStore} from "./useBlockHooks";
import {DEPTH_TYPE} from "../../context/SelectionManagerProvider";
import {useContext} from "react";
import {BlockReRenderContext} from "../context/BlockReRenderContext";


const getBlockId = (e) => e.target.closest("[data-block-id]")?.dataset.blockId;

/**
 * @desc 에디터 내 블록 드래그 앤 드롭을 처리하는 핸들러
 * @returns {{onDrop: function, onDragOver: function, onDragEnd: function, onDragStart: function}}
 */
function useEditorDragHandler() {
    const dragOverBlockIdManager = useDragOverBlockIdManager();
    const {setReRenderTargetId} = useContext(BlockReRenderContext);

    const blockStore = useBlockStore();
    const {getIndexOfBlock, moveBlock, addBlockId,deleteBlock} = useBlockIdList()

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
        if(!dragStartBlockId) return;

        blockMove(dragStartBlockId,blockId);
    }

    const blockMove = (targetId, destinationId) => {
        const destinationBlock = blockStore.getBlock(destinationId);
        const destinationType = destinationBlock.type;
        const destinationDepth = destinationBlock.depth ?? 0;
        const destinationParentBlock = blockStore.getBlock(destinationBlock.parentId);
        const targetBlock = blockStore.getBlock(targetId);
        const targetType = targetBlock.type;
        const targetDepth = targetBlock.depth ?? 0;

        // 0뎁스에서 0뎁스로 이동
        if(targetDepth === 0 && destinationDepth === 0) {
            moveBlock(targetId,getIndexOfBlock(destinationId));
            return;
        }

        // 1뎁스 이상에서 0 뎁스로 이동
        // TODO Depth 변경 필요
        if(targetDepth > 0 && destinationDepth === 0)
        {
            const parentBlock = blockStore.getBlock(targetBlock.parentId);
            parentBlock.childIdList = [...parentBlock.childIdList].filter((item) => item !== targetId);
            setReRenderTargetId(parentBlock);
            targetBlock.parentId = "";
            blockStore.recalculateDepth(targetBlock.id,0);
            addBlockId(targetId,getIndexOfBlock(destinationId) + 1);
            return;
        }

        // 0뎁스에서 1뎁스 이상으로 이동하는 경우
        if(targetDepth === 0 && destinationDepth > 0) {
            if(!DEPTH_TYPE.includes(targetType)) return;
            if(targetType === destinationType) {
                const parentBlock = blockStore.getBlock(destinationBlock.parentId);
                targetBlock.parentId = destinationBlock.parentId;
                const destinationIndex = parentBlock.childIdList.indexOf(destinationId);
                parentBlock.childIdList.splice(destinationIndex+1,0,targetId);
                blockStore.recalculateDepth(targetId,destinationBlock.depth);
                deleteBlock(targetId);
                return;
            }
        }

        if(targetDepth > 0 && destinationDepth > 0) {
            // 부모가 같은 경우
            if(targetBlock.parentId === destinationBlock.parentId) {
                const targetIdx = destinationParentBlock.childIdList.indexOf(targetId);
                destinationParentBlock.childIdList.splice(targetIdx,1);
                const destinationIdx = destinationParentBlock.childIdList.indexOf(destinationId);
                destinationParentBlock.childIdList.splice(destinationIdx+1,0,targetId);
            }
            // 부모가 다른 경우
            else {
                // targetParentBlock.removeChild(targetId)
                // targetBlock.parentId = destinationBlock.parentId;
                //
                // // 뎁스가 다른 경우
                // if(targetDepth !== destinationDepth) {
                //     blockStore.recalculateDepth(targetId,destinationBlock.depth);
                // }
                //
                // const destinationIdx = destinationParentBlock.childIdList.indexOf(destinationId);
                // destinationParentBlock.childIdList.splice(destinationIdx+1, 0,targetId);
            }
        }
    }

    return {onDragOver, onDrop, onDragEnd,onDragStart}

}

export default useEditorDragHandler;