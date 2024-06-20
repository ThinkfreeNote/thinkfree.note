import React from 'react';
import CalcDialog from "../editor/table/CalcDialog";

function Dialog({position,type,payload}) {

    if(type === "calc") {
        return <CalcDialog position={position} payload={payload}/>
    }

}

export default Dialog;