import {editorSelection} from "../../../App";
import {useBlockStore} from "./useBlockHooks";
import {useTableHandler} from "../table/hooks/useTableHandler";
import useTextHandler from "../text/hooks/useTextHandler";
import useNote from "./useNote";
import useEditorList2 from "./useEditorList2";
import useBlockIdList from "./useBlockIdList";
import {useMouseHoverBlockManager} from "../context/EditorMouseHoverProvider";


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
    const {increaseDepth} = useEditorList2();

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
        else if (blockType === "ul" || blockType === "ol" || blockType === "cl") {
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
        const blockType = editorSelection.startBlockType;
        if(!blockType) return;

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

        const blockType = editorSelection.startBlockType;
        if(blockType === "table") {
            // 계산함수 처리
            if (e.key === "=") {
                openCalcDialog();
            }
        }
    }

    const {setHoverBlockId,clearHoverBlockId} = useMouseHoverBlockManager();

    const onMouseLeave = (e) => {
        // console.log(e.target.closest("[data-block-id]"));
    }

    const onMouseOver = (e) => {
        const $block = e.target.closest("[data-block-id]")?.dataset.blockId;

        setHoverBlockId($block ?? null);
    }

    return {onKeyDownHandler, onInputHandler, onKeyUp, onMouseOver, onMouseLeave};
}


export default useEditorHandler;