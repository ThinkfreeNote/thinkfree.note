import {editorSelection} from "../../../App";
import {useBlockStore} from "./useBlockHooks";
import {useTableHandler} from "../table/hooks/useTableHandler";
import useTextHandler from "../text/hooks/useTextHandler";
import useNote from "./useNote";
import useListHandler from "../list/hooks/useListHandler";
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
    const {increaseDepth} = useListHandler();

    const onKeyDownHandler = (e) => {
        const blockType = editorSelection.startBlockType;
        if(!blockType) return;
        // 테이블인 경우
        if (blockType === "table") {
            e.key.startsWith("Arrow") && tableArrowHandler(e);
            e.key === "Enter" && tableEnterHandler(e);
        }
        // 텍스트 블록인 경우
        else if (blockType === "text" || blockType === "head") {
            if (e.key === "Enter") {
                if (editorSelection.isCaret()) {
                    appendBlockAfterCurrentBlock(e);
                } else {
                    e.preventDefault();
                }
            }

            if (e.key === "Tab") {
                e.preventDefault();
            }

            if (e.key === "Backspace") {
                // 캐럿일 때의 로직
                if (editorSelection.isCaret()) {
                    if (editorSelection.isStartCaret()) {
                        e.preventDefault();
                        // backspace 로 블록 삭제되는 경우
                        backspaceRemoveBlock();
                    } else {
                        deleteTextValue();
                    }
                }
                // 셀렉션일 때의 로직
                else {
                    e.preventDefault();
                }
            }
        }
        // 리스트 블록인 경우
        else if (blockType === "ul" || blockType === "ol") {
            if (e.key === "Enter") {
                if (editorSelection.isCaret()) {
                    appendBlockAfterCurrentListBlock(e);
                } else {
                    e.preventDefault();
                }
            }

            if (e.key === "Tab") {
                e.preventDefault();
                if (editorSelection.isCaret()) {
                    increaseDepth();
                }
            }

            if (e.key === "Backspace") {
                // 캐럿일 때의 로직
                if (editorSelection.isCaret()) {
                    if (editorSelection.isStartCaret()) {
                        e.preventDefault();
                        // backspace 로 블록 삭제되는 경우
                        backspaceRemoveListBlock();
                    } else {
                        deleteTextValue();
                    }
                }
                // 셀렉션일 때의 로직
                else {
                    e.preventDefault();
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