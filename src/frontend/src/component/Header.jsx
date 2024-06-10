import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <Link to="/">
                <h1>
                    Thinkfree.note
                </h1>
            </Link>
        </header>
    );
}

export default Header;