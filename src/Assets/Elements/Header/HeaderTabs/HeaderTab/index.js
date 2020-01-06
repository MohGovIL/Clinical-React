import React from 'react';
import StyledTab from './Style';
const HeaderTab = (props) => {

    return (
        <StyledTab selected={props.selected} label={props.Label} onClick={() => props.tabsHandler(props.tabIndex)}/>
    );
};

export default HeaderTab;
