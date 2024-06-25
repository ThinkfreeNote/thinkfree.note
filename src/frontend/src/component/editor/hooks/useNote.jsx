import {editorSelection} from "../../../App";
import useBlockIdList from "./useBlockIdList";
import {useContext} from "react";
import {MenuContext} from "../../ui/menu/MenuContext";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {useBlockStore} from "./useBlockHooks";
import {useSelectionManager} from "../../context/SelectionManagerProvider";
import {EditorSelection} from "../../../model/Selection";
import useListHandler from "../list/hooks/useListHandler";
import useTextHandler from "../text/hooks/useTextHandler";

/**
 * @desc blockIdList, blockStore 둘 다 조작하는 함수들 관리
 */
function useNote() {
    const {blockIdList, getPrevBlockId} = useBlockIdList();
    const blockStore = useBlockStore();
    const note = useBlockIdList();
    const {offset} = useContext(MenuContext);
    const {setReRenderTargetId} = useContext(BlockReRenderContext);
    const selectionManager = useSelectionManager();
    const {divideText} = useTextHandler();
    const {addListBlock, resetChildBlockDepth} = useListHandler();

    /**
     * @desc 텍스트 블록을 삭제하는 함수
     */
    const backspaceRemoveBlock = () => {
        if (editorSelection.blockId[0] === blockIdList[0]) return;

        const blockId = editorSelection.startBlockId;
        const prevBlockId = getPrevBlockId(blockId);
        const prevBlock = blockStore.getBlock(prevBlockId);
        let blockOffset = prevBlock.getLastTextId();
        let offset = EditorSelection.LAST_OFFSET;

        // 블록이 비어있지 않은 경우 현재 블록과 이전 블록을 합쳐주는 작업 수행
        if (!editorSelection.isEmptyBlock()) {
            blockStore.compositeBlock(blockId, prevBlockId);
            setReRenderTargetId(prevBlockId);

            // 합쳐지면서 합치기 전 블록의 text 객체가 없어졌다면
            if (prevBlock.textIdList.indexOf(blockOffset) === -1) {
                // 합쳐진 블록의 첫번째로 blockOffset 변경
                blockOffset = prevBlock.getFirstTextId();
                offset = EditorSelection.FRONT_OFFSET;
            }
        }
        note.deleteBlock(blockId);

        // 커서 이동
        selectionManager.setEditorCaretPosition(prevBlockId, blockOffset, offset, "text");
    }

    /**
     * @desc 리스트 블록을 삭제하는 함수
     */
    const backspaceRemoveListBlock = () => {
        if (editorSelection.blockId[0] === blockIdList[0]) return;
        const curBlock = blockStore.getBlock(editorSelection.startBlockId);
        let index = note.getIndexOfBlock(curBlock.id);

        // 텍스트 블럭으로 변경
        curBlock.type = "text";

        // blockIdList 에 넣을 Block 들
        let updatedBlockIdList = [];

        if (curBlock.depth === 0) {
            // 자식들의 depth 재조정
            updatedBlockIdList = resetChildBlockDepth(curBlock);
            setReRenderTargetId(curBlock.id);

        }
        else {
            const parentBlock = blockStore.getBlock(curBlock.parentId);

            // 부모 관계 끊어줌
            parentBlock.removeChild(curBlock.id);
            curBlock.parentId = "";

            if (curBlock.depth === 1) {
                // 자식들의 depth 재조정
                updatedBlockIdList = resetChildBlockDepth(curBlock);
                index = note.getIndexOfBlock(parentBlock.id);
            } else {
                index = note.getIndexOfBlock(parentBlock.parentId);
            }

            // 자신도 blockIdList 에 추가
            updatedBlockIdList.unshift(curBlock.id);
            setReRenderTargetId(parentBlock.id);
        }

        // 현재 블럭의 자식을 끊어줌
        curBlock.childIdList = [];

        // 노트에 추가
        note.concatBlockIdList(updatedBlockIdList, index + 1);
        selectionManager.setEditorCaretPosition(curBlock.id, curBlock.getFirstBlockOffset(), EditorSelection.FRONT_OFFSET, "text");
    }

    /**
     * 텍스트 블록을 추가하는 함수
     * @param e
     */
    const appendBlockAfterCurrentBlock = (e) => {
        e.preventDefault();

        // 메뉴가 열려있으면 동작 x
        if (offset.x !== 0 && offset.y !== 0) return;

        const curBlock = blockStore.getBlock(editorSelection.startBlockId);
        let newBlockType = "text"

        // 텍스트를 분리하고 삭제된 텍스트 리스트를 가져옴
        const removedTextList = divideText(curBlock);

        // 새로운 Text들을 담은 TextBlock을 추가
        const newBlock = blockStore.createNewBlock(newBlockType, removedTextList);
        note.addBlockId(newBlock.id, note.getIndexOfBlock(curBlock.id) + 1);

        // 기존 TextBlock 리렌더링
        setReRenderTargetId(curBlock.id);
        selectionManager.setEditorCaretPosition(newBlock.id,newBlock.getFirstTextId(),EditorSelection.FRONT_OFFSET,"text");
    }

    /**
     * 리스트 블록을 추가하는 함수
     * @param e
     */
    const appendBlockAfterCurrentListBlock = (e) => {
        e.preventDefault();
        // 메뉴가 열려있으면 동작 x
        if (offset.x !== 0 && offset.y !== 0) return;

        const curBlock = blockStore.getBlock(editorSelection.startBlockId);
        const text = curBlock.getTextFromId(editorSelection.getClosestId("text").start);
        let newBlockType = curBlock.type;

        // textValue 가 없고, depth 가 0일 때만 TextBlock 추가
        if (text.value === "" && curBlock.textIdList.length === 1 && curBlock.depth === 0) {
            curBlock.type = "text";// TODO: type만 text로 바꿔준거라 문제 생길 수도 있음
            newBlockType = "text";
        }

        // 텍스트를 분리하고 삭제된 텍스트 리스트를 가져옴
        const removedTextList = divideText(curBlock);

        // BlockStore 에 새로운 Text 들을 담은 ListBlock 추가 (이전과 같은 타입의 블럭을 생성)
        const newBlock = blockStore.createNewBlock(newBlockType, removedTextList);

        // 새로운 블럭을 리스트에 맞게 넣어줌
        addListBlock(curBlock, newBlock);
        selectionManager.setEditorCaretPosition(newBlock.id,newBlock.getFirstTextId(),EditorSelection.FRONT_OFFSET,"text");
    }

    return {
        backspaceRemoveBlock,
        backspaceRemoveListBlock,
        appendBlockAfterCurrentBlock,
        appendBlockAfterCurrentListBlock
    }
}

export default useNote;