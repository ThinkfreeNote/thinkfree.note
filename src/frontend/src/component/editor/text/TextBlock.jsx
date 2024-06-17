import React, {useRef} from 'react';
import TextComponent from "./TextComponent";
import {useBlockData} from "../hooks/useBlockHooks";
import {useBlockId} from "../BlockManagerProvider";
import {generate4wordId} from "../../../utils/id";
import useTextBlockObserver from "./hooks/useTextBlockObserver";

function TextBlock({curBlock}) {
    let {blockId} = useBlockId();
    let textBlock = useBlockData(blockId);

    // 리스트 블럭에서 온 경우 현재 블럭을 기준으로 한다.
    if (curBlock !== undefined) {
        textBlock = curBlock;
    }

    const ref = useRef(null);
    const key = generate4wordId();
    useTextBlockObserver(ref);

    return (
        <p ref={ref} key={key} data-block-id={textBlock.id} data-leaf="true">
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