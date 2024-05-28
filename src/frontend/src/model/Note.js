export class Note {
    constructor() {
        this.blockIdList = [];
    }

    addBlockId(blockId) {
        this.blockIdList.push(blockId);
    }
}