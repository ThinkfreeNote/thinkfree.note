import {createContext, useContext, useEffect, useReducer} from "react";
import {editorSelection} from "../../App";
import {useBlockStore} from "../editor/hooks/useBlockHooks";
import {EditorSelection} from "../../model/Selection";

const SelectionManagerContext = createContext(null);

const reducer = (state, action) => {
    switch (action.type) {
        case "setCaret" : {
            return {
                blockId: action.blockId,
                blockOffset: action.blockOffset,
                blockType: action.blockType,
                offset: action.offset
            }
        }
        case "recoveryPosition" : {
            return {
                ...state
            }
        }
        default : {

        }
    }
}

function SelectionManagerProvider({children}) {
    const [selectionTarget, dispatch] = useReducer(reducer, null);

    useEffect(() => {
        if (!selectionTarget) return;
        editorSelection.removeSelection();
        const $block = document.querySelector(`[data-block-id="${selectionTarget.blockId}"]`);
        if (selectionTarget.blockType === "text") {
            const $textSpan = $block.querySelector(`[data-text-id="${selectionTarget.blockOffset}"]`);
            if (!$textSpan) return;
            const childNode = $textSpan.childNodes[0];
            const offset = selectionTarget.offset === EditorSelection.LAST_OFFSET ? childNode.textContent.length : selectionTarget.offset;

            editorSelection.setCaret(childNode, childNode.nodeType === Node.TEXT_NODE ? offset : 0);
        }
        else if (selectionTarget.blockType === "table") {
            const [rowId,columnId] = selectionTarget.blockOffset;
            const $tableRow = $block.querySelector(`[data-row-id="${rowId}"]`);
            const $cell = $tableRow.querySelector(`[data-cell-id="${columnId}"]`);


            const container = [...$cell.childNodes].find(item => item.nodeType === Node.TEXT_NODE || item.tagName === "BR");
            const offset = selectionTarget.offset === EditorSelection.LAST_OFFSET ? container.textContent.length : selectionTarget.offset;

            editorSelection.setCaret(container,container.nodeType === Node.TEXT_NODE ? offset : 0);

        }
    }, [selectionTarget]);


    return <SelectionManagerContext.Provider value={dispatch}>
        {children}
    </SelectionManagerContext.Provider>
}


/**
 * @desc 에디터 셀렉션 관리 훅
 */
export function useSelectionManager() {
    const dispatch = useContext(SelectionManagerContext);


    /**
     * @desc
     * @param blockId 이동할 블록 아이디
     * @param blockOffset block 내 text, cell 요소 아이디
     * @param offset text, cell 속의 텍스트 오프셋
     * @param blockType
     */
    const setEditorCaretPosition = (blockId, blockOffset, offset, blockType) => {
        dispatch({type: "setCaret", blockId, blockOffset, offset, blockType});
    }

    const recoveryPosition = () => {
        dispatch({type: "recoveryPosition"});
    }


    return {setEditorCaretPosition, recoveryPosition}
}


/**
 * @desc 블록 처음 렌더링 시 커서 지정
 */
export function useInitBlockCursor(blockId) {
    const blockStore = useBlockStore();
    const blockData = blockStore.getBlock(blockId);
    const blockType = blockData.type;
    const {setEditorCaretPosition} = useSelectionManager();

    useEffect(() => {
        if (blockType === "table") {
            setEditorCaretPosition(blockId, blockData.getFirstCellOffset(), EditorSelection.LAST_OFFSET, "table");
        } else {
            setEditorCaretPosition(blockId, blockData.getFirstTextId(), EditorSelection.FRONT_OFFSET, "text");
        }
    }, [])

}

export default SelectionManagerProvider;