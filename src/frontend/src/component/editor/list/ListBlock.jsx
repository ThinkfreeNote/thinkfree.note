import React, {useContext} from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import {BlockContext} from "../BlockContextProvider";
import TextWrapper from "../text/TextWrapper";
import TextComponent from "../text/TextComponent";


function ListBlock({type}) {
    const {blockId} = useContext(BlockContext);
    const textBlock = useBlockData(blockId);
    
    return (
        <p className={type} data-leaf="true">
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