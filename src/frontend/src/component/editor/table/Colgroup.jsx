import React from 'react';
import {useTableData} from "./hooks/useTableData";


function Colgroup() {
    const tableData = useTableData();

    return (
        <colgroup>
            {tableData.format.map((item) => {
                const width = tableData.getColumnStyle(item).width;
                return (
                    // 윈도우 창 크기 조절 및 overflow 속성 미적용 이슈 해결하기 위해 minWidth, maxWidth 추가
                    <col key={item} data-col-id={item}
                         width={width} style={{minWidth: width, maxWidth: width}}/>
                )
            })}
        </colgroup>
    );
}

export default Colgroup;