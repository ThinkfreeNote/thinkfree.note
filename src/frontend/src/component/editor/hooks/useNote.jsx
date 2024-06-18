import {editorSelection} from "../../../App";
import {Text} from "../../../model/Text";
import {getRandomId} from "../../../utils/id";
import {FontStyle} from "../../../model/FontStyle";
import useBlockIdList from "./useBlockIdList";
import {useContext} from "react";
import {MenuContext} from "../../common/MenuContext";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {useBlockStore} from "./useBlockHooks";
import {useSelectionManager} from "../../context/SelectionManagerProvider";
import {EditorSelection} from "../../../model/Selection";

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

    /**
     * @desc 블록을 삭제하는 함수
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

    const appendBlockAfterCurrentBlock = (e) => {
        e.preventDefault();
        // 메뉴가 열려있으면 동작 x
        if (offset.x !== 0 && offset.y !== 0) return;

        const block = blockStore.getBlock(editorSelection.startBlockId);
        const text = block.getTextFromId(editorSelection.getClosestId("text").start);
        let textIdx = block.getTextIdx(text.id);
        let newBlockType = block.type;

        // textValue가 없을 때 depth 줄여주거나 다음 블럭 생성
        if (newBlockType === "ol" || newBlockType === "ul" && text.value === "" && block.textIdList.length === 1) {
            if (block.depth === 0) {
                newBlockType = "text";
            } else {
                // 뎁스를 줄여줌
                block.depth -= 1;
            }
        }

        // 분리하고 업데이트된 textIdx 구함
        const dividedTextContents = editorSelection.getDividedTextContentsFromCaret();
        const cnt = block.divideText(textIdx, dividedTextContents.before, dividedTextContents.after);

        // text 마지막에 캐럿이 잡힐 경우 예외 처리
        if (dividedTextContents.after === "") textIdx++;

        // 추가된만큼 idx 증가
        textIdx += cnt;

        // 기존 textBlock에 있는 text들 삭제
        const removedTextList = [];
        while (true) {
            const text = block.removeText(textIdx);
            if (!text) break;
            removedTextList.push(text);
        }
        if (block.textIdList.length === 0) {
            block.addText(new Text(getRandomId(), "", new FontStyle()));
        }

        // 새로운 Text들을 담은 TextBlock을 추가 (이전과 같은 타입의 텍스트 블럭을 생성)
        const newBlock = blockStore.createNewBlock(newBlockType, removedTextList);
        note.addBlockId(newBlock.id, note.getIndexOfBlock(block.id) + 1);
        // 기존 TextBlock 리렌더링
        setReRenderTargetId(block.id);
    }

    return {backspaceRemoveBlock, appendBlockAfterCurrentBlock}
}

export default useNote;