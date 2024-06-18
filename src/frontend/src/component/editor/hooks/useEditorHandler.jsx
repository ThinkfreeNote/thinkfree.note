import {editorSelection} from "../../../App";
import {useBlockStore} from "./useBlockHooks";
import {useTableHandler} from "../table/hooks/useTableHandler";
import useTextHandler from "../text/hooks/useTextHandler";
import useNote from "./useNote";
import useListHandler from "../list/hooks/useListHandler";



/**
 * @desc #editor 요소에 등록될 이벤트 핸들러
 * @returns {{onInputHandler: function, onKeyDownHandler: function}}
 */
function useEditorHandler() {
    const blockStore = useBlockStore();
    const {backspaceRemoveBlock, appendBlockAfterCurrentBlock} = useNote();
    const {tableArrowHandler, updateCellValue} = useTableHandler();
    const {updateTextValue, deleteTextValue} = useTextHandler();
    const {changeDepth} = useListHandler();

    const onKeyDownHandler = (e) => {
        // 키 입력이 발생한 block Id와 타입
        const blockId = editorSelection.blockId[0];
        const block = blockStore.getBlock(blockId);
        if (!blockId) return;
        const blockType = block.type;

        // 테이블인 경우
        if (blockType === "table") {
            e.key.startsWith("Arrow") && tableArrowHandler(e);
        }
        // 텍스트류 블록인 경우 (Text, List, etc...)
        else {
            if (e.key === "Enter") {
                if(editorSelection.isCaret()){
                    appendBlockAfterCurrentBlock(e);
                }
                else {
                    e.preventDefault();
                }
            }

            if (e.key === "Tab") {
                e.preventDefault();
                changeDepth();
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
    }

    const onInputHandler = (e) => {
        // Input 입력이 발생한 block Id와 타입
        const blockId = editorSelection.startBlockId;
        if (!blockId) return;
        const blockType = blockStore.getBlockType(blockId);
        if (blockType === "table") {
            updateCellValue();
        } else {
            updateTextValue();
        }
    }

    return {onKeyDownHandler, onInputHandler};
}


export default useEditorHandler;