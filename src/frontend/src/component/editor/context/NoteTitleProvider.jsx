import React, {createContext, useState} from 'react';

export const NoteTitleContext = createContext(null);

function NoteTitleProvider({children}) {
    const [title,setTitle] = useState(null);

    return (
        <NoteTitleContext.Provider value={{title, setTitle}}>
            {children}
        </NoteTitleContext.Provider>
    );
}

export default NoteTitleProvider;