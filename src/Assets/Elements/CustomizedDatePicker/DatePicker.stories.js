import React from "react";
import CustomizedDatePicker from "./index";
import {StylesProvider} from '@material-ui/core/styles'
import GlobalStyle from "../../Themes/GlobalStyle";
import {withKnobs, object} from "@storybook/addon-knobs";
import {store} from "../../../index";
import { Provider as ReduxProvider } from 'react-redux';
import ProviderWrapper from "../../../../.storybook/Provider";

export default {
    title: 'DatePicker',
    component: CustomizedDatePicker,
    decorators: [withKnobs, story => <StylesProvider injectFirst><GlobalStyle lang_id={'7'}/>{story()}
    </StylesProvider>],
    excludeStories: /.*Data$/,
}

export const normalDatePicker = () => {
    return <ReduxProvider store={store}>
        <CustomizedDatePicker iconColor={object('Icon color', '#076ce9')} languageDirection={object('languageDirection', 'rtl')} isDisabled={object('isDisabled', false)}/>
    </ReduxProvider>
};
