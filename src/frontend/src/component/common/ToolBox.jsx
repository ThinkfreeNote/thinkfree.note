import React, {useState} from 'react';

function ToolBoxMain({children, top, left}) {
    return (
        <div style={{position:"fixed",top: `${top}px`,left:`${left}px`}} contentEditable={false} className="tool-box">{children}</div>
    );
}

function ToolBoxPlain({icon, handler}) {
    return <button className="tool-box-item" onClick={handler}>{icon}</button>
}

/**
 * @desc 드롭다운 메뉴 select 반환
 * @param children 자식으로 ToolBox.DropDownItem 요소 전달 필요
 * @param handler
 * @returns {JSX.Element}
 */
function ToolBoxDropDown({children, handler}) {
    return <select onChange={(e)=> handler(e.target.value)}>
        {children}
    </select>
}

/**
 * @desc 드롭다운 메뉴 아이템, ToolBox.Dropdown 에 children 으로 전달
 * @param value 값
 * @param unit 단위
 * @returns {JSX.Element}
 */
function ToolBoxDropDownItem({value, unit}) {
    return <option value={value}>{value} {unit}</option>
}



const COLOR_LIST = ["255, 255, 255", "233, 242, 255", "231, 249, 255", "220, 255, 241", "255, 247, 214", "255, 236, 235", "243, 240, 255", "241, 242, 244", "204, 224, 255", "198, 237, 251", "186, 243, 219", "248, 230, 160", "255, 213, 210", "223, 216, 253", "0, 0, 0", "87, 157, 255", "108, 195, 224", "75, 206, 151", "254, 163, 98", "248, 113, 104", "159, 143, 239"];

function ToolBoxColor({icon, handler}) {
    const [openColorPicker, setOpenColorPicker] = useState(false);
    return <div style={{position: "relative"}}>
        <button className="tool-box-item" onClick={() => {
            setOpenColorPicker(prev => !prev);
        }}>{icon}</button>
        {openColorPicker && <div onClick={()=>setOpenColorPicker(false)} className="tool-box-colorPicker" style={{position: "absolute", left: "36px",top:0}}>
            {COLOR_LIST.map((item, idx) => {
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
    DropDownBox : ToolBoxDropDown,
    DropDownItem : ToolBoxDropDownItem
});