import React from 'react';
import SideNavigation from "../ui/side/SideNavigation";
import Header from "./Header";
import NoteTitleProvider from "../editor/context/NoteTitleProvider";
import {useParams} from "react-router-dom";

function NotePage({children}) {
    const {noteId} = useParams();
    return (
        <NoteTitleProvider >
            <div className="note-page">
                <Header/>
                <div style={{display: "flex", height: "100%"}}>
                    <SideNavigation/>
                    <main className="note-box" key={noteId}>
                        {children}
                    </main>
                </div>
            </div>
        </NoteTitleProvider>
    );
}

export default NotePage;