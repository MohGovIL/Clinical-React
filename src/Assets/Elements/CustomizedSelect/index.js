import React, {useState} from 'react';
import StyledSelect from './Style'
import {StyledButton, StyledMenu, StyledMenuItem, StyledDiv} from './Style'

import {useTranslation} from "react-i18next";
import {ExpandMore} from "@material-ui/icons/";
import ListItemText from '@material-ui/core/ListItemText';

/**
 * @author Idan Gigi gigiidan@gmail.com, Yuriy Gershem yuriyge@matrix.co.il
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
const CustomizedSelect = ({background_color, icon_color, text_color, value, onChange, options, appointmentId, label, langDirection, codeMenu}) => {

    const {t} = useTranslation();
    ///
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (code) => {
        onChange(code);
        setAnchorEl(null);
    };

    ///
    let opts = {};
    let iconForButtonMenu = <ExpandMore htmlColor={icon_color}/>;
    let typeIcon = (langDirection === 'rtl' ? 'endIcon' : 'startIcon');
    opts[typeIcon] = iconForButtonMenu;

    let buttonLabel = " ";
    if (options !== undefined) {
        var res = options.find(obj => {
            return obj.code === value
        });

        if (res !== undefined) {
            buttonLabel = res.name;
        }
    }
    return (
        <StyledDiv>
            <StyledButton
                background_color={background_color}
                icon_color={icon_color}
                text_color={text_color}
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
                language_direction={langDirection}
                {...opts}
            >{buttonLabel}
            </StyledButton>
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
                    <StyledMenuItem key={optionIndex}
                        // selected={optionIndex === selectedIndex}
                                    onClick={event => handleMenuItemClick(option.code)}
                    >
                        <ListItemText value={option.code} primary={t(option.name)}/>
                    </StyledMenuItem>
                )}
            </StyledMenu>
        </StyledDiv>
    );
};

CustomizedSelect.propTypes = {};

export default CustomizedSelect;
