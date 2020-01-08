import React, {useState} from 'react';
import StyledAppBar from "./Style";
import HeaderTabs from "./HeaderTabs";
import Search from "./Search";
import HeaderIcon from "./HeaderIcon";
import VerticalLine from './VerticalLine';
import notifications from "../../Images/notifications.png";
import userAvatar from '../../Images/user-avatar-image.png';
import arrowDown from '../../Images/icon-color-copy.png';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HeaderDropDown from "./HeaderDropDown";
import {connect} from "react-redux";
import {logoutAction} from "../../../Store/Actions/LoginActions/LoginActions";
import DefaultLogo from "./DefaultLogo";
import {useTranslation} from "react-i18next";

const Header = (props) => {

    const {t} = useTranslation();

    const matches = useMediaQuery('(min-width:1025px)');

    // Arrow functionality and props
    const [isArrowOpen, setIsArrowOpen] = useState(false);
    const arrowDownClickHandler = e => {
        setIsArrowOpen(!isArrowOpen)
    };
    const arrowDropDownItems = [{
        Label: t('Disconnect'),
        func: props.logoutAction
    },
        {
            Label: t('Change Password'),
            func: null
        }];


    return (
        <StyledAppBar>
            <DefaultLogo/>
            <HeaderTabs Items={props.Items}/>
            <Search/>
            <HeaderIcon alt='notifications icon' img={notifications}/>
            <VerticalLine/>
            <HeaderIcon alt='profile avatar' img={userAvatar}/>
            {matches ? <span>חני החנייה</span> : null}
            <HeaderIcon alt='arrow down' img={arrowDown} onClick={arrowDownClickHandler}>
                <HeaderDropDown isOpen={isArrowOpen} Items={arrowDropDownItems}/>
            </HeaderIcon>
        </StyledAppBar>
    );
};

export default connect(null, {logoutAction})(Header);
