import {editorSelection} from "../App";

/**
 * @description 현재 캐럿이 한 블록 내의 마지막에 위치해 있는지 확인
 * @param selection
 * @returns {boolean}
 */
const isCaretAtEnd = (selection) => {
    if (selection.type !== "Caret") return false;

    const {endContainer, endOffset} = selection.getRangeAt(0);

    const anchorBlock = editorSelection.getClosestElement("block").start;

    // Block 에서 BlockWrapper를 제외하고 탐색하기 위한 과정
    const children = [...anchorBlock.children];
    const component = children.find(element => element.isContentEditable);
    const lastChild = component.lastChild;

    if (!lastChild) return true;

    // 마지막이 BOM 문자열인지에 따라 마지막 offset 구하기
    const lastChildLength = /\uFEFF/.test(lastChild.textContent[lastChild.length - 1]) ? lastChild.length - 1 : lastChild.length;
    // 현재 캐릿이 마지막 노드이고, 오프셋이 마지막인 경우에만
    return endContainer === lastChild && (endOffset === lastChild.length || endOffset === lastChildLength);
}

/**
 * 셀렉션 혹은 캐럿의 블록 반환
 * @param {Selection} selection
 * @returns {{anchorBlockId: string, focusBlockId: string}}
 */
const getSelectedBlock = (selection) => {
    let {anchorNode, focusNode} = selection;
    const anchorElement = (anchorNode.nodeType === Node.TEXT_NODE) ? anchorNode.parentElement : anchorNode;
    const focusElement = (focusNode.nodeType === Node.TEXT_NODE) ? focusNode.parentElement : focusNode;

    return {
        anchorBlock: anchorElement.closest("[data-block-id]"),
        focusBlock: focusElement.closest("[data-block-id]")
    }
}

export {
      isCaretAtEnd, getSelectedBlock
}