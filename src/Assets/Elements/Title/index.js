import React from 'react';
import {useTranslation} from "react-i18next";
import TitleStyle from './Style';

const Title = ({label}) => {
    const {t} = useTranslation();
    return (
        <TitleStyle>
            {t(label)}
        </TitleStyle>
    );
};

export default Title;
