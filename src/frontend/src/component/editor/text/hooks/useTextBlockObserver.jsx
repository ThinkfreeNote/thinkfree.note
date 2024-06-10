import {useEffect, useRef} from "react";
import {useBlockStore} from "../../hooks/useBlockHooks";


// TODO 크로스 브라우징 확인 필요
function useTextBlockObserver(blockId) {
    const textBlockRef = useRef(null);
    const blockStore = useBlockStore();

    useEffect(()=> {
        if(!textBlockRef.current) return;
        const $textBlock = textBlockRef.current;

        // node가 추가되는지 감시하는 MutationObserver
        const observer = new MutationObserver((mutationList, observer) => {
            for ( const mutation of mutationList ) {
                // childList : node 추가 삭제 되는 경우 && addedNodes로 추가인 경우로 조건 축소
                if(mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    const target = mutation.target;
                    
                    // TODO 크로스 브라우징 이슈 발생할 여지 높음
                    // 동일 아이디의 span태그가 contentediable에 의해서 작성되어 발생하는 문제 해결 
                    if(target.tagName === "FONT" || target.tagName === "I") {
                        const textId = target.closest("[data-text-id]").dataset.textId;
                        // 동일한 ID의 span 태그를 합쳐주는 동작 수행
                        const spanList = $textBlock.querySelectorAll(`[data-text-id="${textId}"]`);
                        spanList[0].firstChild.nodeValue += spanList[1].textContent;
                        $textBlock.removeChild(spanList[1]);
                    }

                    // 아래의 경우는 새로운 span 태그를 생성하지 않고 span 태그 안에 다른 태그가 추가되어 별도로 처리
                    if(target.tagName === "B" || target.tagName === "U" || target.tagName === "STRIKE") {
                        const parentSpan = target.parentElement;
                        parentSpan.firstChild.nodeValue += target.textContent;
                        parentSpan.removeChild(target);
                    }
                }
                else if(mutation.type === "childList") {
                    if($textBlock.childNodes.length === 1 && $textBlock.childNodes[0].tagName === "BR") {
                        const removeSpan = mutation.removedNodes[0];
                        removeSpan.replaceChildren(document.createElement("br"));
                        if($textBlock instanceof HTMLElement) {
                            $textBlock.replaceChildren(removeSpan);
                        }
                    }
                }
            }
        })

        observer.observe($textBlock, { attributes : true, childList : true, subtree : true});

        return () => {
            observer.disconnect();
        }
    },[])


    return {ref : textBlockRef}

}

export default useTextBlockObserver;
