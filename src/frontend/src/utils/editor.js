import {getRandomId} from "./id";
import {Block} from "../model/block";


/**
 * 새로운 블록 생성해서 저장소에 추가
 * @param store 블록 저장소
 * @param type 블록 타입 (type 처리 기능 추가 예정)
 * @return id 생성된 블록 아이디
 */
const createBlock = (store, type) => {
    const id = getRandomId();
    store[id] = new Block(0);  // 임시 : 테스트로 변경

    return id;
}

const getCaratPositionElement = () => {
    const {anchorNode} = window.getSelection();
    if (anchorNode instanceof Text) {
        return anchorNode.parentElement.closest("[data-block-id]");
    } else {
        return anchorNode;
    }
}

const getBlockId = (element) => {
    return element.closest("[data-block-id]").dataset.blockId;
}



/// selection

const setSelection = (targetId) =>{
    const selection = window.getSelection();

    const newRange = document.createRange();

    const caretContainer = document.querySelector(`[data-block-id="${targetId}"]`);
    console.log(caretContainer);
   // newRange.setStart();
}


export {
    createBlock, getCaratPositionElement,getBlockId,setSelection
}