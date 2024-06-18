import React, {useRef} from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextComponent from "../text/TextComponent";
import BlockWrapper from "../BlockWrapper";


function ListBlock({blockId, index}) {
    const listBlock = useBlockData(blockId);

    const ref = useRef(null);
    const key = generate4wordId();
    useTextBlockObserver(ref);

    index = index === undefined ? null : index

    // text 맵으로 돌고
    // child가 있으면 block 맵으로 돌기
    return (
        <>
            <p ref={ref} key={key} className={listBlock.type} data-list-index={index + 1} data-block-id={listBlock.id} data-leaf="true">
                {listBlock.textIdList.map(textId => (
                    <TextComponent
                        key={textId}
                        textId={textId}
                        text={listBlock.contents[textId]}
                    />
                ))}
            </p>

            {listBlock.childIdList.map((blockId, index) => (
                <BlockWrapper id={blockId} type={listBlock.type}>
                    <ListBlock
                        id={blockId}
                        index={index}
                    />
                </BlockWrapper>
            ))}
        </>
    );
}

export default ListBlock;