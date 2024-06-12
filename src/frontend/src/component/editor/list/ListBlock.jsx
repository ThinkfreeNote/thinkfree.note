import React from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import {useBlockId} from "../BlockManagerProvider";
import TextWrapper from "../text/TextWrapper";
import TextComponent from "../text/TextComponent";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";


function ListBlock({type}) {
    const {blockId} = useBlockId();
    const textBlock = useBlockData(blockId);
    const liValue = type === "ul" ? "• " : textBlock.olIdx + ". ";
    const {ref} = useTextBlockObserver(blockId);


    return (
        <p ref={ref} className="list" data-li-value={liValue} data-leaf="true">
            <TextWrapper>
                    {textBlock.textIdList.map(textId => (
                        <TextComponent
                            key={textId}
                            textId={textId}
                            text={textBlock.contents[textId]}
                        />
                    ))}
            </TextWrapper>
        </p>
    );
}

export default ListBlock;