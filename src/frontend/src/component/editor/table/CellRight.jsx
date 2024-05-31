import React, {useContext} from 'react';
import {ColgroupSetterContext} from "./contexts/ColgroupProvider";

function CellRight({columnId}) {
    const {setCurrentCol,setStartPageX} = useContext(ColgroupSetterContext);

    const mouseDownHandler = (e) => {
        const selection = window.getSelection();
        selection.removeAllRanges();

        setCurrentCol(columnId);
        setStartPageX(e.pageX);
    }

    return (
        <div onMouseDown={mouseDownHandler} contentEditable={false} style={{
            position: "absolute",
            border: "none",
            width: "13px",
            userSelect: "none",
            top: 0,
            right: "-6px",
            zIndex : 3,
            height: "100%",
            opacity: `0`,
            cursor: "col-resize",
        }}></div>
    );
}

export default CellRight;