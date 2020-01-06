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
            {props.Items.map((item, itemIndex) => <HeaderTab Label={item.Label} Link={item.Link}
                                                             SubMenu={item.SubMenu}
                                                             key={itemIndex}
                                                             tabIndex={itemIndex}
                                                             tabsHandler={tabsHandler}
                                                             selected={itemIndex === value ? 'true' : 'false'}/>)}
        </StyledTabs>
    );
};

export default HeaderTabs;


