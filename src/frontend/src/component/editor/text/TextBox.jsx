import React, {useState} from 'react';

function TextBox() {
    const [isHidden, setIsHidden] = useState(false);

    if (isHidden) {
        return;
    } else {
        return (
            <div contentEditable={false} className="text-box" style={{userSelect: "none"}}>
                <button>123</button>
                <button>123</button>
            </div>
        );
    }
}

export default TextBox;
