import React from 'react';
import StyledSelect from './Style'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CustomizedSelect = ({background_color, icon_color, value, onChange, items}) => {



    return (
        <StyledSelect native  background_color={background_color} icon_color={icon_color} IconComponent={ExpandMoreIcon} value>

        </StyledSelect>
    );
};

export default CustomizedSelect;
