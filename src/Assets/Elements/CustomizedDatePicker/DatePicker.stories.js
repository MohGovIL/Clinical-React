import React from "react";
import CustomizedDatePicker from "./index";
import {StylesProvider} from '@material-ui/core/styles'
import GlobalStyle from "../../Themes/GlobalStyle";
import {withKnobs, object} from "@storybook/addon-knobs";
import {store} from "../../../index";
import ProviderWrapper from "../../../../.storybook/Provider";

store.getState().settings.lang_dir = "rtl";
store.getState().settings.lang_code = "he";

export default {
    title: 'DatePicker',
    component: CustomizedDatePicker,
    decorators: [withKnobs, story => <ProviderWrapper store={store}><StylesProvider injectFirst><GlobalStyle lang_id={'7'}/>{story()}
    </StylesProvider></ProviderWrapper>],
    excludeStories: /.*Data$/,
}

export const normalDatePicker = () => {
    return <CustomizedDatePicker iconColor={object('Icon color', '#076ce9')} isDisabled={object('isDisabled', false)}/>
};
