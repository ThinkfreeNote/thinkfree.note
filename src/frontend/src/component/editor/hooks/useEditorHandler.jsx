import {editorSelection} from "../../../App";
import {useBlockStore} from "./useBlockHooks";
import {useTableHandler} from "../table/hooks/useTableHandler";
import useTextHandler from "../text/hooks/useTextHandler";
import useNote from "./useNote";
import useListHandler from "../list/hooks/useListHandler";
import useBlockIdList from "./useBlockIdList";


/**
 * @desc #editor 요소에 등록될 이벤트 핸들러
 * @returns {{onInputHandler: function, onKeyDownHandler: function}}
 */
function useEditorHandler() {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();
    const {
        backspaceRemoveBlock,
        backspaceRemoveListBlock,
        appendBlockAfterCurrentBlock,
        appendBlockAfterCurrentListBlock
    } = useNote();
    const {tableArrowHandler, updateCellValue, openCalcDialog, tableEnterHandler} = useTableHandler();
    const {updateTextValue, deleteTextValue} = useTextHandler();
    const {increaseDepth} = useListHandler();

    const onKeyDownHandler = (e) => {
        // 키 입력이 발생한 block Id와 타입
        const blockId = editorSelection.startBlockId;
        const block = blockStore.getBlock(blockId);
        if (!blockId || !block) return;
        const blockType = block.type;
        // 셀렉션 키 다운일 경우 return
        if (!editorSelection.isCaret()) {
            e.preventDefault();
            return;
        }

        // 테이블인 경우
        if (blockType === "table") {
            e.key.startsWith("Arrow") && tableArrowHandler(e);
            e.key === "Enter" && tableEnterHandler(e);
        }
        // 텍스트 블록인 경우
        else if (blockType === "text" || blockType === "head" || blockType === "quote") {
            if (e.key === "Enter") {
                appendBlockAfterCurrentBlock(e);
            }

            if (e.key === "Tab") {
                e.preventDefault();
            }

            if (e.key === "Backspace") {
                if (editorSelection.isStartCaret()) {
                    e.preventDefault();
                    // backspace 로 블록 삭제되는 경우
                    backspaceRemoveBlock();
                } else {
                    deleteTextValue();
                }
            }
        }
        // 리스트 블록인 경우
        else if (blockType === "ul" || blockType === "ol") {
            if (e.key === "Enter") {
                appendBlockAfterCurrentListBlock(e);
            }

            if (e.key === "Tab") {
                e.preventDefault();
                increaseDepth();
            }

            if (e.key === "Backspace") {
                if (editorSelection.isStartCaret()) {
                    e.preventDefault();
                    // backspace 로 블록 삭제되는 경우
                    backspaceRemoveListBlock();
                } else {
                    deleteTextValue();
                }
            }
        }
    }

    const onInputHandler = (e) => {
        // Input 입력이 발생한 block Id와 타입
        const blockId = editorSelection.startBlockId;
        if (!blockId) return;
        const blockType = editorSelection.startBlockType;
        if (blockType === "title") return;
        if (blockType === "table") {
            updateCellValue();
        } else {
            updateTextValue();
        }
        // selectionChange 가 Backspace 에서 적용되지 않아 사용하는 중
        editorSelection.updateEditorSelection(blockIdList);
    }

    const onKeyUp = (e) => {
        // 계산함수 처리
        if (e.key === "=") {
            openCalcDialog();
        }
    }

    return {onKeyDownHandler, onInputHandler, onKeyUp};
}


export default useEditorHandler;