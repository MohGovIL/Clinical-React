import React, {useState} from 'react';
import StyledAppBar from './Style';
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';

const AppointmentsStatusFilterBox = () => {

    //simulateApi
    const status = [
        'מוזמנים',
        'ממתינים לבדיקה',
        'ממתינים לפיענוח',
        'סיימו טיפול'
    ];

    const [tabsValue, setTabsValue] = useState(0);

    return (
        <StyledAppBar>
            <Tabs value={tabsValue}>
                {status.map((tabsName, tabsIndex) => {
                    return <Tab label={tabsName}
                                onChange={() => setTabsValue(prevState => prevState !== tabsIndex ? tabsIndex : prevState)}/>
                })}
            </Tabs>
        </StyledAppBar>
    );
};

export default AppointmentsStatusFilterBox;
