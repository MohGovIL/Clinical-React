import React, {useState} from 'react';
import StyledAppBar from './Style';
import StatusFilterBoxTabs from "./StatusFilterBoxTabs";
import {devicesValue} from "../../Themes/BreakPoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const StatusFilterBox = ({desktop, tabs}) => {

    const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);


    const [tabsValue, setTabsValue] = useState(0);

    const tabsHandler = (tabsIndex) => {
        setTabsValue(tabsIndex);
    };

    return (
        <StyledAppBar>
            <StatusFilterBoxTabs value={tabsValue} tabs={tabs}
                                 tabsHandler={tabsHandler} orientation={matches ? "vertical" : "horizontal"} />
        </StyledAppBar>
    );
};

export default StatusFilterBox;
