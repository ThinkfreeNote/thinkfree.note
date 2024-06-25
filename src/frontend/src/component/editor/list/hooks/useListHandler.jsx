import {useBlockStore} from "../../hooks/useBlockHooks";
import useList from "./useList";


function useListHandler() {
    const {toggleCheckBox} = useList();
    const blockStore = useBlockStore();

    const onClickHandler = (e) => {
        const blockId = e.target.closest("[data-block-id]").dataset.blockId;
        if (blockStore.getBlockType(blockId) === "cl") {
            const x = e.target.closest("p")?.getBoundingClientRect().x;
            // 체크 박스 알맞은 위치 클릭
            if (e.clientX >= x && e.clientX <= x + 20) {
                toggleCheckBox(e);
            }
        }
    }

    return {onClickHandler};
}

export default useListHandler;