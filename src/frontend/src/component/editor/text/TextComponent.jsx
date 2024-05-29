import React from 'react';


function TextComponent({text}) {
    return (
        <div className={text.id} style={text.fontStyle}>
            {text.value}
        </div>
    )
}

export default TextComponent;