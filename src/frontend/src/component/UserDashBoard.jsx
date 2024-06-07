import React from 'react';
import {ReactComponent as UserIcon} from "../assets/icon_user.svg";

function UserDashBoard(props) {
    return (
        <div className="user-dashboard-box">
            <span className="user-dashboard-icon"><UserIcon/></span>
            <span>User1's Note</span>
        </div>
    );
}

export default UserDashBoard;