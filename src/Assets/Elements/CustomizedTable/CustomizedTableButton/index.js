// import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import React from "react";
//
// const CustomizedTableButton = styled(({onClickHandler, ...other}) => <Button {...other}
//                                                                              onClick={(e) => onClickHandler()}/>)`
//   border-radius: 25px;
// `;
//
// export default CustomizedTableButton;

import React from 'react';
import StyledButton from './Style';
import {useTranslation} from "react-i18next";

const CustomizedTableButton = ({variant, color, label, onClickHandler}) => {
    const {t} = useTranslation();
    return (
        <StyledButton variant={variant} color={color}>
            {t(label)}
        </StyledButton>
    );
};

export default CustomizedTableButton;
