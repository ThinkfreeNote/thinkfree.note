import React, {useState} from 'react';
import useBlockIdList from "../hooks/useBlockIdList";
import {useBlockId} from "../BlockManagerProvider";

function BlockDragPoint() {
    return (
        <div contentEditable={"false"} suppressContentEditableWarning={true} className={`drag-point-wrapper`}>
            <div className="drag-point"></div>
        </div>
    );
}

export default BlockDragPoint;