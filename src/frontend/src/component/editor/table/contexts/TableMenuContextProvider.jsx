import React, {createContext} from 'react';
import useOffset from "../../../../hooks/useOffset";

export const TableMenuOffsetContext = createContext(null);
export const TableMenuSetterContext = createContext(null);

/**
 * @desc 테이블에서 메뉴와 관련된 값 관리 Context
 * @desc 메뉴가 보여질 오프셋,
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function TableMenuProvider({children}) {
    const [menuOffset, dispatch] = useOffset({x:0,y:0});

    return (
        <TableMenuOffsetContext.Provider value={menuOffset}>
            <TableMenuSetterContext.Provider value={dispatch}>
                {children}
            </TableMenuSetterContext.Provider>
        </TableMenuOffsetContext.Provider>
    );
}

export default TableMenuProvider;