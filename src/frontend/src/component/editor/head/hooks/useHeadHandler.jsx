import {useBlockStore} from "../../hooks/useBlockHooks";
import useBlockIdList from "../../hooks/useBlockIdList";

function useHeadHandler() {
    const {blockIdList} = useBlockIdList();
    const blockStore = useBlockStore();

    const getHeadBlockIdList = () => {
        const headBlockIdList = [];
        blockIdList.forEach((blockId) => {
            if (blockStore.getBlockType(blockId) === "head") {
                headBlockIdList.push(blockId)
            }
        })

        return headBlockIdList;
    };

    const getTextValue = (headBlockId) => {
        const headBlock = blockStore.getBlock(headBlockId);
        let textValue = "";

        headBlock.textIdList.forEach((textId) => {
            const text = headBlock.getTextFromId(textId);
            textValue += text.value;
        });

        return textValue;
    }

    const scrollToHead = (headBlockId) => {
        const headElement = document.querySelector(`[data-block-id="${headBlockId}"]`);
        if (headElement) {
            headElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return {getHeadBlockIdList, getTextValue, scrollToHead};
}

export default useHeadHandler;