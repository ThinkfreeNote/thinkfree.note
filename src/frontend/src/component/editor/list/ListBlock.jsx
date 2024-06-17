import React, {useRef} from 'react';

import {useBlockData, useBlockStore} from "../hooks/useBlockHooks";
import {useBlockId} from "../BlockManagerProvider";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextBlock from "../text/TextBlock";



function ListBlock() {
    const blockStore = useBlockStore();
    const {blockId} = useBlockId();
    const listBlock = useBlockData(blockId);
    const ref = useRef(null);
    useTextBlockObserver(ref);

    return (
        <div ref={ref} key={generate4wordId()} className="list">
            {listBlock.textBlockIdList.map(((textBlockId) => (
                <TextBlock
                    key={textBlockId}
                    curBlock={blockStore[textBlockId]}
                />
            )))}
        </div>
    );
}

export default ListBlock;