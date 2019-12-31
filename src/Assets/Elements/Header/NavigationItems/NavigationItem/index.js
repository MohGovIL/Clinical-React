import React from 'react';
import Style from "./Style";
import {Link} from 'react-router-dom';

const NavigationItem = (props) => {
    return <Style>
        {props.Title}
    </Style>;
};

export default NavigationItem;
