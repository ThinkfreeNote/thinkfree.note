import React, {useRef} from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextComponent from "../text/TextComponent";
import BlockWrapper from "../BlockWrapper";
import {useBlockId} from "../BlockManagerProvider";
import useListHandler from "./hooks/useListHandler";

function ListBlock({index = 0}) {
    const {onClickHandler} = useListHandler();
    const {blockId} = useBlockId();
    const listBlock = useBlockData(blockId);
    const ref = useRef(null);
    const key = generate4wordId();
    const listValue = getListIndexValue(index, listBlock.depth);

    useTextBlockObserver(ref);

    // text 맵으로 돌고
    // child가 있으면 block 맵으로 돌기
    return (
        <>
            <p ref={ref} key={key} className={listBlock.type} data-leaf="true"
               data-list-depth={listBlock.depth}
               data-list-value={listValue}
               data-list-check={listBlock.isChecked}
               onClick={onClickHandler}
            >

                {listBlock.textIdList.map(textId => {
                    return (
                        <TextComponent
                            key={textId}
                            textId={textId}
                            text={listBlock.contents[textId]}
                        />
                    )
                })}
            </p>
            {listBlock.childIdList.length > 0 &&
                <div style={{display: "flex", padding : "5px 0"}}>
                    <div className="fake-marker" contentEditable={false}>
                        <svg style={{height: 0}}/>
                    </div>
                    <div>
                        {listBlock.childIdList.map((blockId, index) => (
                            <BlockWrapper key={blockId} id={blockId} type={listBlock.type} isDepth={true}>
                                <ListBlock index={index}/>
                            </BlockWrapper>))}
                    </div>
                </div>
            }
        </>
    );
}

const getListIndexValue = (index, depth) => {
    // 인덱스가 넘어가면 초기화
    const maxIndex = 26;
    // 0이면 maxIndex 반환
    const changedIndex = index % maxIndex || maxIndex; // 1-based index

    switch (depth) {
        case 0:
            return index;
        case 1:
            return String.fromCharCode(64 + changedIndex); // 65 is 'A'
        case 2:
            return String.fromCharCode(96 + changedIndex); // 97 is 'a'
        default:
            return index;
    }
}

export default React.memo(ListBlock);