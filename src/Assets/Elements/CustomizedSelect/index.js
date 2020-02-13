import React, {useRef, useState} from 'react';
import StyledSelect from './Style'
import {StyledButton, StyledMenu, StyledMenuItem} from './Style'

import {useTranslation} from "react-i18next";

import CustomizedSelectOption from "./CustomizedSelectOption";
import {updateAppointmentStatus} from "../../../Utils/Services/FhirAPI";

import {ExpandMore} from "@material-ui/icons/";
import Button from "@material-ui/core/Button";

import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param background_color
 * @param icon_color
 * @param textcolor
 * @param value
 * @param onChange
 * @param options
 * @param appointmentId
 * @returns {Component}
 * @constructor
 */
const CustomizedSelect = ({background_color, icon_color, text_color, value, onChange, options, appointmentId, label, langDirection,codeMenu}) => {

    const {t} = useTranslation();
    ///
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = event => {
        setAnchorEl( event.currentTarget );
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);

        console.log("-----");
        console.log(index);
        console.log("-----");

        setAnchorEl(null);
    };
    ///
    let opts = {};
    let iconForButtonMenu = <ExpandMore htmlColor={icon_color}/>;
    let typeIcon = (langDirection === 'rtl' ? 'endIcon' : 'startIcon');
    opts[typeIcon] = iconForButtonMenu;



    return (
        <React.Fragment>
            {label ? <b>{label}</b> : null}

            <StyledButton
                background_color={background_color}
                icon_color={icon_color}
                text_color={text_color}

                aria-controls="customized-menu"
                aria-haspopup="true"
                // ref={anchorEl.current}
                // onClick={() => onChange()}
                onClick={handleClick}
                language_direction={langDirection}
                {...opts}
            >
                {t("All")}
            </StyledButton>
            {/*<ClickAwayListener onClickAway={handleClose}>*/}
                <StyledMenu
                    background_color={background_color}
                    icon_color={icon_color}
                    text_color={text_color}

                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}

                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {options.map((option, optionIndex) =>
                        <StyledMenuItem key={optionIndex} selected={optionIndex === selectedIndex}
                                        onClick={event => handleMenuItemClick(event, option.code)}
                        >
                            <ListItemText value={option.code} primary={t(option.display)}/>
                        </StyledMenuItem>
                    )}
                </StyledMenu>
            {/*</ClickAwayListener>*/}
        </React.Fragment>
    );
};

export default CustomizedSelect;
