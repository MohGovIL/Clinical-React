import React from 'react';
import StyledButton from './Style';
import {useTranslation} from "react-i18next";

const CustomizedTableButton = ({variant, color, label, onClickHandler,mode}) => {
    const {t} = useTranslation();
    console.log("mode = "+ mode);
    return (
        <StyledButton variant={variant} color={color} onClick={onClickHandler} disabled={mode !== 'write' ? true : false}>
            {t(label)}
        </StyledButton>
    );
};

export default CustomizedTableButton;
