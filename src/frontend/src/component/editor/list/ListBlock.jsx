import React, {useRef} from 'react';

import {useBlockData} from "../hooks/useBlockHooks";
import useTextBlockObserver from "../text/hooks/useTextBlockObserver";
import {generate4wordId} from "../../../utils/id";
import TextComponent from "../text/TextComponent";
import BlockWrapper from "../BlockWrapper";
import {useBlockId} from "../BlockManagerProvider";
import useListHandler from "./hooks/useListHandler";

function ListBlock({index = 0}) {
    const {blockId} = useBlockId();
    const listBlock = useBlockData(blockId);
    const ref = useRef(null);
    const key = generate4wordId();
    const listValue = useListHandler()
        .getListCssValue(listBlock.type, index + 1, listBlock.depth, listBlock.isChecked);
    useTextBlockObserver(ref);

    // text 맵으로 돌고
    // child가 있으면 block 맵으로 돌기
    return (
        <>
            <p ref={ref} key={key} className={listBlock.type} data-list-depth={listBlock.depth}
               data-list-value={listValue} data-leaf="true">

                {listBlock.textIdList.map(textId => {
                    return (
                        <TextComponent
                            key={textId}
                            textId={textId}
                            text={listBlock.contents[textId]}
                        />
                    )
                })}
            </p>
            {listBlock.childIdList.length > 0 &&
                <div style={{display: "flex", padding : "5px 0"}}>
                    <div className="fake-marker" contentEditable={false}>
                        <svg style={{height: 0}}/>
                    </div>
                    <div>
                        {listBlock.childIdList.map((blockId, index) => (
                            <BlockWrapper key={blockId} id={blockId} type={listBlock.type} isDepth={true}>
                                <ListBlock index={index}/>
                            </BlockWrapper>))}
                    </div>
                </div>
            }
        </>
    );
}

export default React.memo(ListBlock);