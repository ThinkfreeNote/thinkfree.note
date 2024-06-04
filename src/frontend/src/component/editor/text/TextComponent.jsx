import React from 'react';


function TextComponent({textId, text}) {
    return (
        <span data-leaf={true} data-text-id={textId} style={text.fontStyle}>
            {text.value}
        </span>
    )
}

export default TextComponent;