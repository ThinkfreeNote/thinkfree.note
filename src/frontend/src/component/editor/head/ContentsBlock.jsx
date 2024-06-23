import React, {useRef} from 'react';

import {useBlockData, useBlockStore} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextComponent from "../text/TextComponent";
import BlockWrapper from "../BlockWrapper";
import {useBlockId} from "../BlockManagerProvider";
import useBlockIdList from "../hooks/useBlockIdList";
import useHeadHandler from "./hooks/useHeadHandler";


function ContentsBlock() {
    const {blockId} = useBlockId();
    const contentsBlock = useBlockData(blockId);
    const ref = useRef(null);
    const key = generate4wordId();
    const useHeadBlockIdList = useHeadHandler().getHeadBlockIdList();
    useTextBlockObserver(ref);

    return (
        <div ref={ref} key={key} data-block-id={contentsBlock.id} contentEditable={false}>
            {useHeadBlockIdList.map(headBlockId => {
                const headBlock = blockStore.getBlock(headBlockId);
                const text = blockStore.getBlock(headBlock.textIdList[0]);
                return (
                    <p key={headBlockId} className="contents" data-contents-level={headBlock.level}>
                        {text.value}
                    </p>
                )
            })}
        </div>
    );
}

export default ContentsBlock;