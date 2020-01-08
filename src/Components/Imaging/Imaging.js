import React from 'react';
import Header from "../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";

const Imaging = () => {
    //Simulate API data
    const {t} = useTranslation();

    const simulateAPI = [
        {Label: t('Patient'), Link: '/Patient', SubMenu: null},
        {Label: t('Calendar'), Link: '/Calendar', SubMenu: null},
        {Label: t('Missions'), Link: '/Missions', SubMenu: null},
        {Label: t('Reports'), Link: '/Reports', SubMenu: null},
    ];
    return (
        <React.Fragment>
            <Header Items={simulateAPI}/>
        </React.Fragment>
    );
};

export default Imaging;
