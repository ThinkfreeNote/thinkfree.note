import React, {useState} from 'react';

function ToolBoxMain({children, style}) {
    return (
        <div style={style} contentEditable={false} className="tool-box">{children}</div>
    );
}

function ToolBoxPlain({icon, handler}) {
    return <button className="tool-box-item" onClick={handler}>{icon}</button>
}


const colors = ["255, 255, 255", "233, 242, 255", "231, 249, 255", "220, 255, 241", "255, 247, 214", "255, 236, 235", "243, 240, 255", "241, 242, 244", "204, 224, 255", "198, 237, 251", "186, 243, 219", "248, 230, 160", "255, 213, 210", "223, 216, 253", "133, 144, 162", "87, 157, 255", "108, 195, 224", "75, 206, 151", "254, 163, 98", "248, 113, 104", "159, 143, 239"];

function ToolBoxColor({icon, handler}) {
    const [openColorPicker, setOpenColorPicker] = useState(false);
    return <div style={{position: "relative"}}>
        <button className="tool-box-item" onClick={() => {
            setOpenColorPicker(prev => !prev);
        }}>{icon}</button>
        {openColorPicker && <div onClick={()=>setOpenColorPicker(false)} className="tool-box-colorPicker" style={{position: "absolute", left: "36px",top:0}}>
            {colors.map((item, idx) => {
                return <button key={item} className="tool-box-colorPicker-color"
                               style={{backgroundColor: `rgb(${item})`, borderColor: `rgba(${item},.8)`}}
                               onClick={() => {
                                   handler(`rgb(${item})`);
                               }}></button>
            })}
        </div>}
    </div>
}

export const ToolBox = Object.assign(ToolBoxMain, {
    Plain: ToolBoxPlain,
    Color: ToolBoxColor,
});