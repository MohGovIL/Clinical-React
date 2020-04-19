import React, {useState} from 'react';
import StyledAppBar from "./Style";
import HeaderTabs from "./HeaderTabs";
import Search from "./Search";
import HeaderIcon from "./HeaderIcon";
import VerticalLine from './VerticalLine';
import notifications from "Assets/Images/notifications.png";
import arrowDown from 'Assets/Images/icon-color-copy.png';
import Logo from 'Assets/Images/Logo Area.png';
import HeaderDropDown from "./HeaderDropDown";
import {connect} from "react-redux";
import {logoutAction} from "Store/Actions/LoginActions/LoginActions";
import {useTranslation} from "react-i18next";
import {ClickAwayListener} from "@material-ui/core";
import RelativeWrapperForClickAwayListener from './RelativeWrapperForClickAwayListener'

const Header = ({Items, logoutAction}) => {

    const {t} = useTranslation();


    // Arrow functionality and props
    const [isArrowOpen, setIsArrowOpen] = useState(false);

    const arrowDownClickHandler = () => {
        setIsArrowOpen(!isArrowOpen);
    };

    const clickAwayHandler = () => {
        setIsArrowOpen(false);
    };

    const arrowDropDownItems = [
        {
            Label: t('Change Password'),
            func: null
        },
        {
            Label: t('Disconnect'),
            func: logoutAction
        }];


    return (
        <StyledAppBar>
            <HeaderIcon alt='Logo' img={Logo}/>
            <HeaderTabs Items={Items}/>
            <Search/>
            <HeaderIcon alt='notifications icon' img={notifications}/>
            <VerticalLine/>
            <span>חני החנייה</span>
            <ClickAwayListener onClickAway={clickAwayHandler}>
                <RelativeWrapperForClickAwayListener>
                    <HeaderIcon alt='arrow down' img={arrowDown} onClick={arrowDownClickHandler}/>
                    {isArrowOpen ? <HeaderDropDown Items={arrowDropDownItems}/> : null}
                </RelativeWrapperForClickAwayListener>
            </ClickAwayListener>
        </StyledAppBar>
    );
};

export default connect(null, {logoutAction})(Header);
