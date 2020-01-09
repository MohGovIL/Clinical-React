import React, {useState} from 'react';
import HeaderTab from "./HeaderTab";
import StyledTabs from './Style';


const HeaderTabs = (props) => {
    const [value, setValue] = useState(0);

    const tabsHandler = (tabIndex) => {
        setValue(tabIndex);
    };

    return (
        <StyledTabs value={value}>
            {props.Items.map((item, itemIndex) => <HeaderTab Label={item.label} Link={item.url}
                                                             SubMenu={item.SubMenu}
                                                             key={item.menu_id}
                                                             tabIndex={itemIndex}
                                                             tabsHandler={tabsHandler}
                                                             selected={itemIndex === value ? 'true' : 'false'}/>)}
        </StyledTabs>
    );
};

export default HeaderTabs;


