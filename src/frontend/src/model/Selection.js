export class EditorSelection {
    constructor() {
        this.selection = window.getSelection();
    }

    isCaret() {
        return this.selection.isCollapsed;
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
        const {startElement,endElement} = this.getElement();
        return {
            start : startElement.closest(`[data-${type}-id]`).dataset[`${type}Id`],
            end : endElement.closest(`[data-${type}-id]`).dataset[`${type}Id`]
        }
    }

    getClosestElement(type) {
        const {startElement,endElement} = this.getElement();
        return {
            start : startElement.closest(`[data-${type}-id]`),
            end : endElement.closest(`[data-${type}-id]`)
        }
    }

    getElement() {
        const startNode = this.getStartNode();
        const endNode = this.getEndNode();
        return {
            startElement : startNode.nodeType === Node.TEXT_NODE ? startNode.parentElement : startNode,
            endElement : endNode.nodeType === Node.TEXT_NODE ? endNode.parentElement : endNode,
        }
    }

    /**
     * 위치 비교
     */
    updateSelectionNodes() {

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
     * 셀랙션된 오프셋 객체 반환(캐럿일 경우 null)
     * @returns {{start: number, end: number}|null}
     */
    getSelectOffset() {
        if (this.isCaret()) return null;
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
}
