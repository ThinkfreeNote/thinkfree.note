import {getLastChildNode} from "../utils/node";

export class EditorSelection {
    static LAST_OFFSET = -1
    static FRONT_OFFSET = 0;
    constructor() {
        this.selection = window.getSelection();
        this.blockId = [];
        this.startBlockId = null;
        this.endBlockId = null;
        this.startBlockType = null;
        this.endBlockType = null;
        this.startBlockOffset = null;
        this.endBlockOffset = null;
        this.startOffset = null;
        this.endOffset = null;
    }

    isCaret() {
        return this.selection.isCollapsed;
    }

    isStartCaret() {
        if (!this.isCaret()) return false;
        if (this.startOffset === 0) return true;
    }

    isEditorLeaf() {
        if (this.isNullSelection()) return false;

        const {startElement, endElement} = this.getElement();
        // boolean 형변환
        return !!(startElement.closest("[data-leaf]") && endElement.closest("[data-leaf]"));
    }

    isNullSelection() {
        const {anchorNode, focusNode} = this.selection;
        return (anchorNode === null || focusNode === null);
    }

    getStartNode() {
        const {anchorNode, focusNode} = this.selection;

        if (anchorNode === null || focusNode === null) {
            return;
        }
        const comparePosition = anchorNode.compareDocumentPosition(focusNode);

        return comparePosition & Node.DOCUMENT_POSITION_FOLLOWING ? anchorNode : focusNode;
    }

    getEndNode() {
        const {anchorNode, focusNode} = this.selection;

        if (anchorNode === null || focusNode === null) {
            return;
        }
        const comparePosition = anchorNode.compareDocumentPosition(focusNode);

        return comparePosition & Node.DOCUMENT_POSITION_PRECEDING ? anchorNode : focusNode;
    }

    getClosestId(type) {
        const {startElement, endElement} = this.getElement();
        return {
            start: startElement.closest(`[data-${type}-id]`)?.dataset[`${type}Id`],
            end: endElement.closest(`[data-${type}-id]`)?.dataset[`${type}Id`]
        }
    }

    getClosestElement(type) {
        const {startElement, endElement} = this.getElement();
        return {
            start: startElement.closest(`[data-${type}-id]`),
            end: endElement.closest(`[data-${type}-id]`)
        }
    }

    getElement() {
        const startNode = this.getStartNode();
        const endNode = this.getEndNode();
        return {
            startElement: startNode.nodeType === Node.TEXT_NODE ? startNode.parentElement : startNode,
            endElement: endNode.nodeType === Node.TEXT_NODE ? endNode.parentElement : endNode,
        }
    }

    isSelectionSameElement() {
        const {startElement, endElement} = this.getElement();
        if (this.isNullSelection()) return false;
        return startElement === endElement;
    }

    setCaret(container, offset = 0) {
        if (!(container instanceof Node)) return;

        const range = new Range();
        range.setStart(container, offset);
        range.collapse(true);

        this.selection.removeAllRanges();
        this.selection.addRange(range);
    }

    setCaretOfBlockId(blockId) {
        const $editor = document.getElementById("editor");
        const $leaf = $editor.querySelector(`[data-block-id="${blockId}"]`).querySelector(`[data-leaf]`)
        const range = new Range();
        let lastNode = getLastChildNode($leaf);

        if (lastNode.nodeType === Node.TEXT_NODE) {
            range.setStart(lastNode, lastNode.nodeValue.length);
        } else {
            range.setStart(lastNode, 0);
        }
        this.selection.removeAllRanges();
        this.selection.addRange(range);
    }

    /**
     * Range 반환
     * @returns {Range}
     */
    getRange() {
        return this.selection.getRangeAt(0);
    }

    /**
     * 오프셋 객체 반환
     * @returns {{start: number, end: number}|null}
     */
    getOffset() {
        const range = this.getRange();

        return {start: range.startOffset, end: range.endOffset};
    }

    /**
     * 셀랙션된 첫 노드와 끝 노드가 Text인지 확인
     * @returns {boolean}
     */
    isTextSelection() {
        return this.getStartNode().nodeType === Node.TEXT_NODE || this.getEndNode().nodeType === Node.TEXT_NODE;
    }

    /**
     * startNode와 endNode의 분리된 TextContent를 가져옴
     * @returns {{startNode: string[], endNode: string[]}}
     */
    getDividedMultiTextContents() {
        const startNode = this.getStartNode();
        const endNode = this.getEndNode();
        const startNodeTextContent = startNode.textContent;
        const endNodeTextContent = endNode.textContent;
        const offset = this.getOffset();

        const startTextBefore = startNodeTextContent.slice(0, offset.start);
        const startTextSelected = startNodeTextContent.slice(offset.start);

        const endTextSelected = endNodeTextContent.slice(0, offset.end);
        const endTextAfter = endNodeTextContent.slice(offset.end);

        return {
            startNode: [startTextBefore, startTextSelected],
            endNode: [endTextSelected, endTextAfter]
        };
    }

    /**
     * Node의 분리된 TextContent를 가져옴
     */
    getDividedTextContents() {
        const startNode = this.getStartNode();
        const endNode = this.getEndNode();
        if (startNode !== endNode) return;
        const textContent = startNode.textContent;
        const offset = this.getOffset();

        const beforeText = textContent.slice(0, offset.start);
        const selectedText = textContent.slice(offset.start, offset.end);
        const afterText = textContent.slice(offset.end, textContent.length);
        return {
            before: beforeText,
            selected: selectedText,
            after: afterText
        };
    }

    /**
     * Node의 분리된 TextContent를 가져옴
     */
    getDividedTextContentsFromCaret() {
        if (!this.isCaret()) return;
        const textContent = this.getStartNode().textContent;
        const offset = this.getOffset();
        const beforeText = textContent.slice(0, offset.start);
        const afterText = textContent.slice(offset.start, textContent.length);
        return {
            before: beforeText,
            after: afterText
        };
    }


    /**
     * @return {boolean} 셀렉션이 같은 블록 내에 있는지
     */
    isCollapseBlock() {
        return this.startBlockId === this.endBlockId;
    }

    isEmptyBlock() {
        // leaf에서 캐럿인지 확인
        if (this.isNullSelection() || !this.isEditorLeaf() || !this.isCaret()) return false;

        const $leaf = this.getElement().startElement.closest("[data-leaf]");
        if ($leaf.textContent.length === 0) return true;
    }

    isLeaf() {
        if (this.isNullSelection()) return false;
        const {startElement, endElement} = this.getElement();
        return !(!startElement.closest("[data-leaf]") || !endElement.closest("[data-leaf]"));
    }

    removeSelection() {
        this.selection.removeAllRanges();
    }

    isEditor() {
        return this.blockId.length > 0
    }

    /**
     * @desc 전달받은 block element의 타입 반환
     * @param $block
     * @returns {string | undefined}
     */
    getBlockType($block) {
        return $block.dataset?.blockType;
    }

    getBoundingRect() {
        return this.selection.getRangeAt(0).getBoundingClientRect();
    }


    clearSelection() {
        this.blockId = [];
        this.startBlockId = null;
        this.endBlockId = null;
        this.startBlockType = null;
        this.endBlockType = null;
    }

    /**
     * @desc 에디터 셀렉션 관리
     * @param blockIdList
     */
    updateEditorSelection(blockIdList) {
        if (this.isNullSelection()) {
            this.clearSelection();
            return;
        }
        const {start, end} = this.getClosestElement("block");
        const {startElement, endElement} = this.getElement();

        if (!start || !end) {
            this.clearSelection();
            return;
        }

        this.updateBlockId(blockIdList);
        this.updateBlockType(start, end);
        this.updateBlockOffset(startElement,endElement);
        this.updateOffset();
    }

    /**
     * @desc 셀렉션 시작 블록아이디 끝 블록 아이디 관리
     */
    updateBlockId(blockIdList) {
        const {start, end} = this.getClosestId("block");

        const startIndex = blockIdList.indexOf(start);
        const endIndex = blockIdList.indexOf(end);

        // 현재 셀렉션된 블록 리스트
        this.blockId = blockIdList.slice(startIndex, endIndex + 1);
        this.startBlockId = start
        this.endBlockId = end;
    }


    /**
     * @desc DOM 커서 기반으로 blockType 업데이트
     * @param $startBlock
     * @param $endBlock
     */
    updateBlockType($startBlock, $endBlock) {
        this.startBlockType = this.getBlockType($startBlock);
        this.endBlockType = this.getBlockType($endBlock);
    }


    /**
     * @desc blockOffset 업데이트, text는 textId, table은 [rowId,columnId], title은 null;
     */
    updateBlockOffset() {
        const {startElement, endElement} = this.getElement();

        const getBlockOffset = ($element, type) => {
            if (type === "table") {
                const columnId = $element.closest("[data-cell-id]")?.dataset.cellId;
                const rowId = $element.closest("[data-row-id]")?.dataset.rowId;

                return [rowId,columnId];
            } else if (type === "title") {

            }
            // Text
            else {
                return $element.closest("[data-text-id]")?.dataset.textId;
            }

            return null;
        }

        this.startBlockOffset = getBlockOffset(startElement, this.startBlockType);
        this.endBlockOffset = getBlockOffset(endElement, this.endBlockType);
    }

    updateOffset() {
        const {anchorNode, focusNode, anchorOffset, focusOffset}  = this.selection;

        const comparePosition = anchorNode.compareDocumentPosition(focusNode) & Node.DOCUMENT_POSITION_FOLLOWING;

        this.startOffset = comparePosition ? anchorOffset : focusOffset;
        this.endOffset = comparePosition ? focusOffset : anchorOffset;
    }
}

