import React, {createContext, useMemo, useState} from 'react';
import {getRandomId} from "../../../utils/id";

export const NoteTitleContext = createContext(null);

function NoteTitleProvider({children}) {
    const [title,setTitle] = useState(null);

    const titleId = useMemo(()=>{
        return getRandomId();
    },[])

    return (
        <NoteTitleContext.Provider value={{title, setTitle, titleId}}>
            {children}
        </NoteTitleContext.Provider>
    );
}

export default NoteTitleProvider;