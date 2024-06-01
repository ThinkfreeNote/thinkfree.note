export class EditorSelection{
    constructor() {
        this.selection = window.getSelection();
        this.isLeaf = false;
        this.startNode = null;
        this.endNode = null;
    }


    /**
     * 위치 비교
     */
    updateSelectionNodes() {
        const {anchorNode, focusNode} = this.selection;

        if(anchorNode === null || focusNode === null) {
            this.clearSelection();
            return;
        }


        const comparePosition = anchorNode.compareDocumentPosition(focusNode);

        if(anchorNode === focusNode) {
            this.startNode = anchorNode;
            this.endNode = anchorNode;
            return;
        }

        // DOM 상 위치 비교
        if(comparePosition & Node.DOCUMENT_POSITION_FOLLOWING) {
            this.startNode = anchorNode;
            this.endNode = focusNode;
        }
        else if(comparePosition & Node.DOCUMENT_POSITION_PRECEDING) {
            this.startNode = focusNode;
            this.endNode = anchorNode;
        }
    }



    getNodes() {
        return {startNode : this.startNode, endNode : this.endNode};
    }

    setCaret(container,offset = 0) {
        if(!(container instanceof Node)) return;

        const range = new Range();
        range.setStart(container,offset);
        range.collapse(true);

        this.selection.removeAllRanges();
        this.selection.addRange(range);
    }

    clearSelection() {
        this.startNode = null;
        this.endNode = null;
    }


}
