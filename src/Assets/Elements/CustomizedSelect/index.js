import React from 'react';
import StyledSelect from './Style'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param background_color
 * @param icon_color
 * @param value
 * @param onChange
 * @param options
 * @returns {Component}
 * @constructor
 */
const CustomizedSelect = ({background_color, icon_color, value, onChange, options}) => {



    return (
        <StyledSelect native  background_color={background_color} icon_color={icon_color} IconComponent={ExpandMoreIcon} value>
            {}
        </StyledSelect>
    );
};

export default CustomizedSelect;
