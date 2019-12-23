import React from 'react';
import {useTranslation} from "react-i18next";
import Header from "../../Assets/Elements/Header/Header";
import HeaderItem from "../../Assets/Elements/Header/HeaderItemWrapper/HeaderItem/HeaderItem";
import Search from "../../Assets/Elements/Search/Search";
import HeaderItemWrapper from "../../Assets/Elements/Header/HeaderItemWrapper/HeaderItemWrapper";

const Imaging = () => {
    const {t} = useTranslation();
    return (
        <React.Fragment>
            <Header>
                <HeaderItemWrapper>
                    <HeaderItem active >{t('Zulu')}</HeaderItem>
                </HeaderItemWrapper>
                <Search placeholder="איתור מטופל"/>
            </Header>
        </React.Fragment>
    );
};

export default Imaging;
