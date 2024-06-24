import React, {useRef} from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextComponent from "../text/TextComponent";
import BlockWrapper from "../BlockWrapper";
import {useBlockId} from "../BlockManagerProvider";

function ListBlock({index = 1}) {
    const {blockId} = useBlockId();
    const listBlock = useBlockData(blockId);

    const ref = useRef(null);
    const key = generate4wordId();
    useTextBlockObserver(ref);
    // text 맵으로 돌고
    // child가 있으면 block 맵으로 돌기
    return (
        <>
            <p ref={ref} key={key} className={listBlock.type} data-list-depth={listBlock.depth}
               data-list-value={`${getListValue(index + 1, listBlock.depth)}`} data-leaf="true">

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

            {
                listBlock.childIdList.map((blockId, index) => (
                    <BlockWrapper key={blockId} id={blockId} type={listBlock.type}>
                        <ListBlock index={index}/>
                    </BlockWrapper>
                ))
            }
        </>
    );
}

// TODO: 함수 빼야함
const getListValue = (index, depth) => {
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