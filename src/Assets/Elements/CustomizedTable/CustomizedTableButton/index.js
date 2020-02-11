import React from 'react';
import StyledButton from './Style';
import {useTranslation} from "react-i18next";

const CustomizedTableButton = ({variant, color, label, onClickHandler}) => {
    const {t} = useTranslation();
    return (
        <StyledButton variant={variant} color={color} onClick={onClickHandler}>
            {t(label)}
        </StyledButton>
    );
};

export default CustomizedTableButton;
