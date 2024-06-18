import {editorSelection} from "../../../App";
import {Text} from "../../../model/Text";
import {getRandomId} from "../../../utils/id";
import {FontStyle} from "../../../model/FontStyle";
import useBlockIdList from "./useBlockIdList";
import {useContext} from "react";
import {MenuContext} from "../../common/MenuContext";
import {BlockReRenderContext} from "../context/BlockReRenderContext";
import {useBlockStore} from "./useBlockHooks";

/**
 * @desc blockIdList, blockStore 둘 다 조작하는 함수들 관리
 */
function useNote() {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const note = useBlockIdList();
    const {offset} = useContext(MenuContext);
    const {setReRenderTargetId} = useContext(BlockReRenderContext);

    /**
     * @desc 블록을 삭제하는 함수, 블록에 내용이 있다면
     */
    const backspaceRemoveBlock = () => {
        const blockId = editorSelection.blockId[0];
        const prevBlockId = blockIdList[blockIdList.indexOf(blockId) - 1];

        if (editorSelection.blockId[0] === blockIdList[0]) return;

        // 블록이 비어있지 않은 경우 현재 블록과 이전 블록을 합쳐주는 작업 수행
        if (!editorSelection.isEmptyBlock()) {
            blockStore.compositeBlock(blockId, prevBlockId);
            setReRenderTargetId(prevBlockId);
        }
        editorSelection.setCaretOfBlockId(prevBlockId);
        note.deleteBlock(blockId);
    }

    const appendBlockAfterCurrentBlock  = (e) => {
        e.preventDefault();
        // 메뉴가 열려있으면 동작 x
        if (offset.x !== 0 && offset.y !== 0) return;

        const block = blockStore.getBlock(editorSelection.startBlockId);
        const text = block.getTextFromId(editorSelection.getClosestId("text").start);

        // 분리하고 업데이트된 textIdx 구함
        const dividedTextContents = editorSelection.getDividedTextContentsFromCaret();
        let textIdx = block.getTextIdx(text.id);
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
        const newBlock = blockStore.createNewBlock(block.type, removedTextList);
        note.addBlockId(newBlock.id, note.getIndexOfBlock(block.id) + 1);
        // 기존 TextBlock 리렌더링
        setReRenderTargetId(block.id);
    }

    return {backspaceRemoveBlock, appendBlockAfterCurrentBlock}
}

export default useNote;