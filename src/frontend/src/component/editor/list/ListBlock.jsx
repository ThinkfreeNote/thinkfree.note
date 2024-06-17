import React, {useRef} from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import {useBlockId} from "../BlockManagerProvider";
import TextComponent from "../text/TextComponent";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";


function ListBlock({type}) {
    const {blockId} = useBlockId();
    const textBlock = useBlockData(blockId);
    const liValue = type === "ul" ? "• " : textBlock.olIdx + ". ";
    const ref = useRef(null);
    useTextBlockObserver(ref);

    return (
        <>
            <p ref={ref} key={generate4wordId()} className="list" data-li-value={liValue} data-leaf="true">
                {textBlock.textIdList.map(textId => (
                    <TextComponent
                        key={textId}
                        textId={textId}
                        text={textBlock.contents[textId]}
                    />
                ))}
            </p>
        </>

    );
}

export default ListBlock;