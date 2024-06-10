/**
 * @desc 매개변수로 전달된 노드의 하위에 있는 노드들 중 가장 마지막에 있는 노드 구하는 함수
 * @param {Node} node
 */
export function getLastChildNode(node) {
    let lastNode = node;

    while(lastNode.nodeType !== Node.TEXT_NODE) {
        if(lastNode.lastChild) {
            lastNode = lastNode.lastChild;
        }
        else {
            break;
        }
    }
    return lastNode;
}

/**
 * @desc 매개변수로 전달된 노드의 하위에 있는 노드들 중 가장 마지막에 있는 노드 구하는 함수 *
 * @param {Node} node
 * @returns {*}
 */
export function getFirstChildNode(node) {
    let firstNode = node;

    while(firstNode.nodeType !== Node.TEXT_NODE) {
        if(firstNode.firstChild) {
            firstNode = firstNode.firstChild;
        }
        else {
            break;
        }
    }
    return firstNode;
}