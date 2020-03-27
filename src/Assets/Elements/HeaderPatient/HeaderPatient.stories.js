import React from "react";
import HeaderPatient from "./index";
import {StylesProvider} from '@material-ui/core/styles'
import GlobalStyle from "../../Themes/GlobalStyle";
import {withKnobs, object} from "@storybook/addon-knobs";
import {store} from "../../../index";
import ProviderWrapper from "../../../../.storybook/Provider";
import {statusesData} from "../CustomizedSelect/Select.stories";
import * as Moment from "moment";

store.getState().settings.lang_dir = "rtl";
store.getState().settings.lang_code = "he";

export default {
    title: 'HeaderPatient',
    component: HeaderPatient,
    decorators: [withKnobs, story => <ProviderWrapper store={store}><StylesProvider injectFirst><GlobalStyle lang_id={'7'}/>{story()}
    </StylesProvider></ProviderWrapper>],
    excludeStories: /.*Data$/,
}

const patientData = {
    firstName: 'Moshe',
    lastName: 'Levinshtein'
};
const isTabletMode = 0;
export const breadcrumbsData = [
    {
        text: "Patient Admission",
        separator: "NavigateNextIcon",
        url: "#",
    },
    {
        text: patientData.firstName + " " + patientData.lastName + " " + (!isTabletMode ? "Encounter date" + ": " : "") + Moment(Moment.now()).format('DD/MM/YYYY'),
        separator: false,
        url: "#"
    }
];

export const normalDatePicker = () => {
    return <HeaderPatient breadcrumbs={object('breadcrumbs', [...breadcrumbsData])} languageDirection={object('languageDirection', 'rtl')}
                          edit_mode={object('edit_mode', 0)}/>
};
