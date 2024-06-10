import React from 'react';
import {ReactComponent as UserIcon} from "../assets/icon_user.svg";

function UserDashBoard() {
    return (
        <div className="user-dashboard-box">
            <span className="user-dashboard-icon"></span>
            <span><span className="user-dashboard-name">관리자</span>님의 노트</span>
        </div>
    );
}

export default UserDashBoard;