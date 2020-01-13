import React from "react";
import Header from "./index";
import DefaultLogo from "./DefaultLogo";
import HeaderDropDown from "./HeaderDropDown";
import ProviderWrapper from "../../../../.storybook/Provider";
import {store} from "../../../index";
import {StylesProvider} from '@material-ui/core/styles'
import GlobalStyle from "../../Themes/GlobalStyle";

export default {
    title: 'Header',
    component: Header,
    decorators: [story => <StylesProvider injectFirst><GlobalStyle lang_id={'7'}/>{story()}</StylesProvider> ]
}

export const normalHeader = () => {
    const items = [
        {
            "label": "Patients",
            "menu_id": "patients",
            "url": "/PatientTraking",
            "children": []
        },
        {
            "label": "Calendar",
            "menu_id": "calendar",
            "url": "/Calendar",
            "children": []
        },
        {
            "label": "Tasks",
            "menu_id": "tasks",
            "url": "/Tasks",
            "children": []
        }
    ];
    return (
        <ProviderWrapper store={store}>
            <Header Items={items}/>
        </ProviderWrapper>)
};

export const defaultLogo = () => {
    return <DefaultLogo/>
};

export const headerDropDownOpened = () => {
    const items = [{
        Label: 'label',
        func: null
    }];
    return <HeaderDropDown isOpen={true} Items={items}/>
};

export const headerDropDownClosed = () => {
    return <HeaderDropDown/>
};
