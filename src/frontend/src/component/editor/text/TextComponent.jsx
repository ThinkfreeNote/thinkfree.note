import React from 'react';


function TextComponent({textId, text}) {
    return (
        <div data-text-id={textId} style={text.fontStyle}>
            {text.value}
        </div>
    )
}

export default TextComponent;