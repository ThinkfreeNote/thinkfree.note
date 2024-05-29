import React, {createContext, useMemo, useState} from 'react';

export const TableSelectorContext = createContext(null);
export const TableSelectorSetContext = createContext(null);

/**
 * @desc 테이블에서 마우스가 위치한 셀 값을 관리하는 ContextProvider
 * @param children
 * @returns {JSX.Element}
 */
function TableMousePositionProvider({children}) {
    const [row, setRow] = useState(-1);
    const [col, setCol] = useState(-1);

    const setter = useMemo(() => {
        return {
            setRow,
            setCol
        }
    },[])


    return (
        <TableSelectorContext.Provider value={{row, col}}>
            <TableSelectorSetContext.Provider value={setter}>
                {children}
            </TableSelectorSetContext.Provider>
        </TableSelectorContext.Provider>
    );
}

export default TableMousePositionProvider;