import React, {useEffect, useState} from 'react';
import StyledSelect from './Style'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useTranslation} from "react-i18next";
import {getStatuses} from "../../../Utils/Services/FhirAPI";
import CustomizedSelectOption from "./CustomizedSelectOption";
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

    const {t} = useTranslation();

    return (
        <StyledSelect native background_color={background_color} icon_color={icon_color} IconComponent={ExpandMoreIcon} value={value}>
            {options.map((option, optionIndex) => <CustomizedSelectOption value={option.code} key={optionIndex}>{t(option.display)}</CustomizedSelectOption>)}
        </StyledSelect>
    );
};

export default CustomizedSelect;
