import React from 'react';
import SideNavigation from "../SideNavigation";
import Header from "../Header";

function NotePage({children}) {
    return (
        <div className="note-page">
            <Header/>
            <div style={{display : "flex", height : "100%"}}>
                <SideNavigation/>
                <main className="note-box">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default NotePage;