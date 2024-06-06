import React from 'react';
import NoteEditorContainer from "./NoteEditorContainer";
import SideNavigation from "../SideNavigation";
import Header from "../Header";

function NotePage() {
    return (
        <div>
            {/*<Header/>*/}
            <div style={{display : "flex"}}>
                <SideNavigation/>
                <main className="note-box">
                    <header className="header">
                        헤더
                    </header>
                    <NoteEditorContainer/>
                </main>
            </div>
        </div>
    );
}

export default NotePage;