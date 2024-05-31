import React, {useState} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";
import {Text} from "../../../model/Text";

function TextBox({targetBlockId, targetTextId}) {
    const [isHidden, setIsHidden] = useState(false);
    const textBlock = useBlockData(targetBlockId);

    const updateFontStyle = (styleName) => {
        const text = textBlock.contents[targetTextId];
        if (!(text instanceof Text)) return;


        console.log(text.fontStyle.fontWeight);


    };


    if (isHidden) {
        return null;
    } else {
        return (
            <div contentEditable={false} style={{userSelect: "none"}}>
                <button onClick={() => updateFontStyle("bold")}>Bord</button>
            </div>
        );
    }
}

export default TextBox;
