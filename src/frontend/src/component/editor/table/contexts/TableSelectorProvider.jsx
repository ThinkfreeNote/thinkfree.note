import React, {createContext, useMemo, useState} from 'react';

export const TableSelectorContext = createContext(null);
export const TableSelectorSetContext = createContext(null);

function TableSelectorProvider({children}) {
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

export default TableSelectorProvider;