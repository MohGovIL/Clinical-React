import React from 'react';
import StyledAppointmentsStatusFilterBoxTabs from './Style'
import AppointmentsStatusFilterBoxTab from "./AppointmentsStatusFilterBoxTab";
import {useTranslation} from "react-i18next";

const AppointmentsStatusFilterBoxTabs = ({value, orientation, tabsHandler, tabsLabel}) => {

    const {t} = useTranslation();

    return (
        <StyledAppointmentsStatusFilterBoxTabs value={value} orientation={orientation} >
            {tabsLabel.map((tabLabel, tabIndex) => <AppointmentsStatusFilterBoxTab key={tabIndex} Label={t(tabLabel)}
                                                                                         selected={value === tabIndex}
                                                                                         tabHandler={tabsHandler}
                                                                                         tabIndex={tabIndex}/>)}
        </StyledAppointmentsStatusFilterBoxTabs>
    );
};

export default AppointmentsStatusFilterBoxTabs;
