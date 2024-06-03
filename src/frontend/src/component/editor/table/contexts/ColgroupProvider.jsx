import React, {createContext, useMemo, useState} from 'react';

export const ColgroupContext = createContext(null);
export const ColgroupSetterContext = createContext(null);

/**
 * @desc Column 크기 조절 구현을 위한 컨텍스트
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function ColgroupProvider({children}) {
    // CellRight 컴포넌트에서 mouseDown 발생 시 발생한 열 ID 저장
    const [currentCol, setCurrentCol] = useState(false);
    // mouseDown, mouseUp 이벤트 등록 위치가 달라 마우스 이벤트 시작 위치를 공유하기 위한 상태
    const [startPageX, setStartPageX] = useState(0);

    const setter = useMemo(() => {
        return {
            setCurrentCol,
            setStartPageX
        }
    },[setCurrentCol,setStartPageX]);

    return (
        <ColgroupContext.Provider value={{currentCol, startPageX}}>
            <ColgroupSetterContext.Provider value={setter}>
             {children}
            </ColgroupSetterContext.Provider>
        </ColgroupContext.Provider>
    );
}

export default ColgroupProvider;