import React, {useState} from 'react';
import StyledAppBar from './Style';
import AppointmentsStatusFilterBoxTabs from "./AppointmentsStatusFilterBoxTabs";

const AppointmentsStatusFilterBox = ({desktop}) => {
    //simulateApi
    const status = [
        'Invited',
        'Waiting for examination',
        'Waiting for decoding',
        'Finished'
    ];

    const [tabsValue, setTabsValue] = useState(0);

    const tabsHandler = (tabsIndex) => {
        setTabsValue(tabsIndex);
    };

    return (
        <StyledAppBar>
            <AppointmentsStatusFilterBoxTabs value={tabsValue} tabsLabel={status}
                                             tabsHandler={tabsHandler} orientation={desktop ? "vertical" : "horizontal"} />
        </StyledAppBar>
    );
};

export default AppointmentsStatusFilterBox;
