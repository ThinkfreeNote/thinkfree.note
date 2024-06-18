import React, {useRef} from 'react';
import TextComponent from "./TextComponent";
import {useBlockData} from "../hooks/useBlockHooks";
import {useBlockId} from "../BlockManagerProvider";
import {generate4wordId} from "../../../utils/id";
import useTextBlockObserver from "./hooks/useTextBlockObserver";

function TextBlock() {
    let {blockId} = useBlockId();
    let textBlock = useBlockData(blockId);

    const ref = useRef(null);
    const key = generate4wordId();
    useTextBlockObserver(ref);

    return (
        <p ref={ref} key={key} data-leaf="true">
            {textBlock.textIdList.map(textId => (
                <TextComponent
                    key={textId}
                    textId={textId}
                    text={textBlock.contents[textId]}
                />
            ))}
        </p>
    );
}

export default TextBlock;