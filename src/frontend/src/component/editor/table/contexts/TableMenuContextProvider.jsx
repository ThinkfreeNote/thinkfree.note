import React, {createContext, useReducer} from 'react';

export const TableMenuOffsetContext = createContext(null);
export const TableMenuSetterContext = createContext(null);


const menuOffsetReducer = (state,action) => {
    switch (action.type){
        case "updateOffset" : {
            return  {
                x : action.x || state.x,
                y : action.y || state.y
            }
        }
        case "clearOffset" : {
            return {
                x : 0,
                y : 0
            }
        }
        default : {
            return state;
        }
    }
}


function TableMenuContextProvider({children}) {
    const [menuOffset, dispatch] = useReducer(menuOffsetReducer,{x : 0,y : 0});

    return (
        <TableMenuOffsetContext.Provider value={menuOffset}>
            <TableMenuSetterContext.Provider value={dispatch}>
                {children}
            </TableMenuSetterContext.Provider>
        </TableMenuOffsetContext.Provider>
    );
}

export default TableMenuContextProvider;