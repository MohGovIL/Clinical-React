import React from 'react';
import {useTranslation} from "react-i18next";
import StyledTableCell from './Style';
const CustomizedTableLabelCell = ({padding, align, label, color}) => {
    const {t} = useTranslation();
    console.log(label);
    return (
        <StyledTableCell padding={padding} align={align} color={color}>
            {t(label)}
        </StyledTableCell>
    );
};

export default CustomizedTableLabelCell;
