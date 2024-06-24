import React, {useRef} from 'react';

import {useBlockData, useBlockStore} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import {useBlockId} from "../BlockManagerProvider";
import useHeadHandler from "../head/hooks/useHeadHandler";

function ContentsBlock() {
    const {blockId} = useBlockId();
    const blockStore = useBlockStore();
    const ref = useRef(null);
    const key = generate4wordId();
    const {getHeadBlockIdList, getTextValue, scrollToHead} = useHeadHandler();
    const headBlockIdList = getHeadBlockIdList();

    useTextBlockObserver(ref);
    return (
        <div ref={ref} key={key} className={"contentsBlock"} contentEditable={false}>
            {headBlockIdList.map(headBlockId => {
                const headBlock = blockStore.getBlock(headBlockId);
                const textValue = getTextValue(headBlockId);

                return (
                    <p key={headBlockId} className="contents" data-contents-level={headBlock.level} onClick={() => scrollToHead(headBlockId)}>
                        {textValue}
                    </p>
                )
            })}
        </div>
    );
}

export default ContentsBlock;