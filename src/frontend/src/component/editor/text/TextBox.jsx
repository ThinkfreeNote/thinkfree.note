import React, {useState} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";

function TextBox({targetBlockId, targetTextId}) {
    const [isHidden, setIsHidden] = useState(false);
    const textBlock = useBlockData(targetBlockId);

    console.log(targetBlockId);
    console.log(targetTextId);


    if (isHidden) {
        return null;
    } else {
        return (
            <div contentEditable={false} style={{userSelect: "none"}}>
                <button>Bord</button>
            </div>
        );
    }
}

export default TextBox;
