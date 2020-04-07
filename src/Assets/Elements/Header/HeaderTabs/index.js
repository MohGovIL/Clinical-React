import React, {useState} from 'react';
import HeaderTab from "./HeaderTab";
import StyledTabs from './Style';


const HeaderTabs = ({Items}) => {
    const [tabsValue, setTabsValue] = useState(0);

    const tabsHandler = (tabIndex) => {
        setTabsValue(tabIndex);
    };

    return (
        <StyledTabs value={tabsValue}>
            {Items.map((item, itemIndex) => <HeaderTab Label={item.label} Link={item.url}
                                                             SubMenu={item.SubMenu}
                                                             key={item.menu_id}
                                                             tabIndex={itemIndex}
                                                             tabsHandler={tabsHandler}
                                                             selected={itemIndex === tabsValue ? 'true' : 'false'}/>)}
        </StyledTabs>
    );
};

export default HeaderTabs;


