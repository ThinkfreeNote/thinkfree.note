import React, {useRef} from 'react';

import {useBlockData, useBlockStore} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextComponent from "../text/TextComponent";
import BlockWrapper from "../BlockWrapper";
import {useBlockId} from "../BlockManagerProvider";


function HeadBlock() {
    const {blockId} = useBlockId();
    const headBlock = useBlockData(blockId);

    const ref = useRef(null);
    const key = generate4wordId();
    useTextBlockObserver(ref);

    let Tag;
    switch(headBlock.level) {
        case 1:
            Tag = "h1"
            break;
        case 2:
            Tag = "h2"
            break;
        case 3:
            Tag = "h3"
            break;
    }

    return (
        <Tag ref={ref} key={key} data-leaf="true">
            {headBlock.textIdList.map(textId => {
                return (
                    <TextComponent
                        key={textId}
                        textId={textId}
                        text={headBlock.contents[textId]}
                    />
                )
            })}
        </Tag>
    );
}

export default HeadBlock;