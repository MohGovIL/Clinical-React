import React from "react";
import {StylesProvider} from '@material-ui/core/styles'
import {withKnobs, object} from "@storybook/addon-knobs";
import CustomizedTableButton from "./index";
import GlobalStyle from "../../../Themes/GlobalStyle";

export default {
    title: 'Button',
    component: CustomizedTableButton,
    decorators: [withKnobs, story => <StylesProvider injectFirst><GlobalStyle lang_id={'7'}/>{story()}</StylesProvider>],
    excludeStories: /.*Data$/,
}

export const buttonNameData = 'button';


export const normalButton = () => {
    return <CustomizedTableButton variant={'outlined'} color={'primary'}>
        {object('button value', `${buttonNameData}`)}
    </CustomizedTableButton>
};
