import React from 'react';
import NavigationItemsStyle from "./NavigationItemsStyle";
import NavigationItem from "./NavigationItem/NavigationItem";
import {useTranslation} from "react-i18next";

const NavigationItems = (props) => {
    const {t} = useTranslation();

    return (
        <NavigationItemsStyle>
            {props.Items.map((Item, ItemIndex) => {
                return <NavigationItem Title={t(Item.Title)} Link={Item.Link} SubMenu={Item.SubMenu} key={ItemIndex}/>
            })}
        </NavigationItemsStyle>
    );
};

export default NavigationItems;
