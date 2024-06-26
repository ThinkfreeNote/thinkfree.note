import React, {useRef} from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextComponent from "../text/TextComponent";
import {useBlockId} from "../BlockManagerProvider";


function QuoteBlock() {
    const {blockId} = useBlockId();
    const quoteBlock = useBlockData(blockId);

    const ref = useRef(null);
    const key = generate4wordId();
    useTextBlockObserver(ref);

    return (
        <blockquote ref={ref} key={key} data-leaf="true">
            {quoteBlock.textIdList.map(textId => {
                return (
                    <TextComponent
                        key={textId}
                        textId={textId}
                        text={quoteBlock.contents[textId]}
                    />
                )
            })}
        </blockquote>
    );
}

export default QuoteBlock;