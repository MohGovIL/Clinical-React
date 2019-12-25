import React, {useState} from 'react';
import NavigationItems from "./NavigationItems";
import Search from "../Search";
import HeaderIcon from "./HeaderIcon";
import NotificationIcon from '../../Images/notifications.png';
import AvatarIcon from '../../Images/user-avatar-image.png';
import Arrow from '../../Images/close.png';
import Style from "./Style";
import VerticalLine from './VerticalLine'
import UserName from "./UserName";
import HeaderDropDownItems from "./HeaderDropdownItems";

const Header = (props) => {
    // const headerIconStateHandler =
    return (
        <Style>
            <NavigationItems Items={props.Items}/>
            <Search placeholder="איתור מטופלים"/>
            <HeaderIcon width="40px" height="40px" alt="NotificationIcon" src={NotificationIcon}/>
            <VerticalLine/>
            <HeaderIcon width="30px" height="30px" alt="AvatarIcon" src={AvatarIcon}/>
            <UserName>שמוליק יצחקוב</UserName>
            <HeaderIcon width="24px" height="24px" alt="Arrow" src={Arrow}>
                <HeaderDropDownItems Items={['שינוי סיסמא', 'התנתקות']}/>
            </HeaderIcon>
        </Style>
    );
};

export default Header;
