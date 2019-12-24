import React from 'react';
import NavigationItemStyle from "./NavigationItemStyle";
import {Link} from 'react-router-dom';

const NavigationItem = (props) => {
    return <NavigationItemStyle>
        {props.Title}
    </NavigationItemStyle>;
};

export default NavigationItem;
