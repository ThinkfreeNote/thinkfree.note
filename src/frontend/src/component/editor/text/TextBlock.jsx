import React, {useContext} from 'react';
import TextComponent from "./TextComponent";
import {useBlockData} from "../hooks/useBlockHooks";
import {BlockContext} from "../BlockContextProvider";
import TextWrapper from "./TextWrapper";

function TextBlock() {
    const {blockId} = useContext(BlockContext);
    const textBlock = useBlockData(blockId);

    return (
        <TextWrapper>
           <p data-leaf="true">
               {textBlock.textIdList.map(textId => (
                   <TextComponent
                       key={textId}
                       textId={textId}
                       text={textBlock.contents[textId]}
                   />
               ))}
           </p>
        </TextWrapper>
    );
}

export default TextBlock;