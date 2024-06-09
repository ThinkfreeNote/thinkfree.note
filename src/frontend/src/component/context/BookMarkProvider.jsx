import React, {createContext, useContext, useEffect, useState} from 'react';

export const BookMarkContext = createContext(null);


function BookMarkProvider({children}) {
    const [bookMarkList, setBookMarkList] = useState([]);

    const reloadBookMarkList = () => {
        fetch(`http://localhost:8080/bookmark/admin`)
            .then(res => res.json())
            .then(data => setBookMarkList(data));
    }

    useEffect(() => {
        reloadBookMarkList();
    }, []);


    return (
        <BookMarkContext.Provider value={{bookMarkList, reloadBookMarkList}}>
            {children}
        </BookMarkContext.Provider>
    );
}


export function useBookMark() {
    const {bookMarkList, reloadBookMarkList} = useContext(BookMarkContext);


    const addBookMark = (documentId) => {
        fetch(`http://localhost:8080/bookmark?userId=admin&documentId=${documentId}`, {
            method: "POST"
        })
            .then(res => res.json())
            .then(data => reloadBookMarkList());
    }

    const deleteBookMark = (documentId) => {
        fetch(`http://localhost:8080/bookmark?userId=admin&documentId=${documentId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => reloadBookMarkList());
    }

    const isBookMark = (documentId) => {
        return bookMarkList.some(item => item.documentId === documentId)
    }

    return {isBookMark, addBookMark, deleteBookMark}

}

export default BookMarkProvider;