import React from 'react';


function TextComponent({textId, text}) {
    return (
        <span key={text.value} data-leaf={true} data-text-id={textId} style={text.fontStyle}>
            {text.value}
        </span>
    )
}

export default TextComponent;