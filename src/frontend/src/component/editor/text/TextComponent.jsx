import React from 'react';


function TextComponent({textId, text}) {
    return (
        <span key={text.value} data-text-id={textId} style={text.fontStyle}>
            {text.value.length !==0 ? text.value : <br/>}
        </span>
    )
}

export default TextComponent;