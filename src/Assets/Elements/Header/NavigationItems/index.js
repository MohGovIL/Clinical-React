import React from 'react';
import Style from "./Style";
import NavigationItem from "./NavigationItem";
import {useTranslation} from "react-i18next";

const NavigationItems = (props) => {
    const {t} = useTranslation();

    return (
        <Style>
            {props.Items.map((Item, ItemIndex) => {
                return <NavigationItem Title={t(Item.Title)} Link={Item.Link} SubMenu={Item.SubMenu} key={ItemIndex}/>
            })}
        </Style>
    );
};

export default NavigationItems;
