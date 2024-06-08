export class EditorSelection {
    constructor() {
        this.selection = window.getSelection();
        this.blockId = [];
    }

    isCaret() {
        return this.selection.isCollapsed;
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
     * @desc 실시간으로 블록 아이디 추적
     * @param blockIdList
     */
    updateEditorSelection(blockIdList) {
        if (this.isNullSelection()) {
            this.blockId = [];
            return;
        }
        const {start, end} = this.getClosestId("block");

        const startIndex = blockIdList.indexOf(start);
        const endIndex = blockIdList.indexOf(end);

        // 현재 셀렉션된 블록 리스트
        this.blockId = blockIdList.slice(startIndex, endIndex + 1);
    }

    /**
     * @return {boolean} 셀렉션이 같은 블록 내에 있는지
     */
    isCollapseBlock() {
        return this.blockId.length === 1
    }

    isEmptyBlock() {
        // leaf에서 캐럿인지 확인
        if(this.isNullSelection() || !this.isEditorLeaf() || !this.isCaret()) return false;

        const $leaf = this.getElement().startElement.closest("[data-leaf]");

        if($leaf.textContent.length === 0) return true;
    }

    isLeaf() {
        if(this.isNullSelection()) return false;
        const {startElement,endElement} = this.getElement();
        return !(!startElement.closest("[data-leaf]") || !endElement.closest("[data-leaf]"));
    }
    removeSelection() {
        this.selection.removeAllRanges();
    }

    isEditor() {
        return this.blockId.length > 0
    }
}
