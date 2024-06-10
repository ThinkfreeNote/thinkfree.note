import React, {useContext} from 'react';
import TextComponent from "./TextComponent";
import {useBlockData} from "../hooks/useBlockHooks";
import {BlockContext} from "../BlockContextProvider";
import TextWrapper from "./TextWrapper";
import {generate4wordId} from "../../../utils/id";
import useTextBlockObserver from "./hooks/useTextBlockObserver";

function TextBlock() {
    const blockContext = useContext(BlockContext);
    const blockId = blockContext.blockId;
    const textBlock = useBlockData(blockId);
    const {ref} = useTextBlockObserver(blockId);

    return (
        <TextWrapper>
           {/* reRender에 의한 수동 리렌더에 대해서만 리렌더링 발생하기 때문에 수동 리렌더일 때마다 key 변경 */}
           <p ref={ref} key={generate4wordId()} data-leaf="true">
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