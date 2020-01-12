import React from "react";
import Header from "./index";
import DefaultLogo from "./DefaultLogo";
import HeaderDropDown from "./HeaderDropDown";

export default {
    title: 'Components',
    component: Header
}

export const normalHeader = () => {
    return < Header />;
};

export const defaultLogo = () => {
  return <DefaultLogo />
};

export const headerDropDownOpened = () => {
    const items = [{
        Label: 'label',
        func: null
    }];
    return <HeaderDropDown isOpen={true} Items={items}/>
};

export const headerDropDownClosed = () => {
  return <HeaderDropDown />
};
