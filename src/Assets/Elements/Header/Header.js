import React, {useState} from 'react';
import NavigationItems from "./NavigationItems/NavigationItems";
import Search from "../Search/Search";
import HeaderIconStyle from "./HeaderIcon/HeaderIconStyle";
import NotificationIcon from '../../Images/notifications.png';
import AvatarIcon from '../../Images/user-avatar-image.png';
import Arrow from '../../Images/close.png';
import HeaderStyle from "./HeaderStyle";
import VerticalLine from "./VerticalLine";
import UserNameStyle from "./UserName/UserNameStyle";

const Header = (props) => {

    return (
        <HeaderStyle>
            <NavigationItems Items={props.Items}/>
            <Search placeholder="איתור מטופלים"/>
            <HeaderIconStyle width="40px" height="40px" alt="NotificationIcon" src={NotificationIcon}/>
            <VerticalLine/>
            <HeaderIconStyle width="30px" height="30px" alt="AvatarIcon" src={AvatarIcon}/>
            <UserNameStyle>שם מדהים</UserNameStyle>
            <HeaderIconStyle width="24px" height="24px" alt="Arrow" src={Arrow}/>
        </HeaderStyle>
    );
};

export default Header;
