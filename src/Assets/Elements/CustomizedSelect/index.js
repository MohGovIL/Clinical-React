import React from 'react';
import StyledSelect from './Style'

const CustomizedSelect = ({backgroundColor, iconColor, value, onChange, items}) => {



    return (
        <StyledSelect backgroundcolor={backgroundColor} iconColor={iconColor} value>
            <option>
                {}
            </option>
        </StyledSelect>
    );
};

export default CustomizedSelect;
