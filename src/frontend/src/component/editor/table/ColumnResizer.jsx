import React, {useContext, useEffect, useState} from 'react';
import {ColgroupContext, ColgroupSetterContext} from "./contexts/ColgroupProvider";
import {useTableData} from "./hooks/useTableData";
import {BlockContext} from "../BlockContextProvider";


/**
 * @desc 열 크기 조절 요소 
 * @returns {JSX.Element}
 */
function ColumnResizer() {
    const tableData = useTableData();
    const {currentCol, startPageX} = useContext(ColgroupContext);
    const {setCurrentCol} = useContext(ColgroupSetterContext);
    const {blockId, reRender} = useContext(BlockContext);
    const [moveX, setMoveX] = useState(0);

    // 테이블의 절대 위치값
    const tableLeft = document.querySelector(`[data-block-id="${blockId}"]`)?.querySelector("table").getBoundingClientRect().left;

    useEffect(() => {
        setMoveX(0);
    }, [currentCol]);

    useEffect(() => {
        // mouseUp 발생 시 위치를 이용해서 모델 값 수정 및 해당 값으로 리렌더링
        const mouseUp = () => {
            if (currentCol) {
                tableData.setColumnWidth(currentCol, moveX);
                setCurrentCol(null);
                reRender();
            }
        }
        
        // 마우스 움직이는 동안 리사이즈 표시자 위치 수정
        const mouseMove = (e) => {
            if (currentCol) {
                setMoveX(e.pageX - startPageX)
            }
        }

        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("mousemove", mouseMove);
        return () => {
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        }
    }, [currentCol, startPageX, setCurrentCol, moveX,reRender,tableData]);
    
    return (<>
            {currentCol ? <div contentEditable={false} className="column-resizer"
                               style={{left: startPageX - tableLeft + moveX}}></div> : null}
        </>)
}

export default ColumnResizer;