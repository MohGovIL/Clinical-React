import PatientDataBlock from "./index";
import React from "react";
import CustomizedDatePicker from "../../../../Assets/Elements/CustomizedDatePicker";
import {object, withKnobs, number, select, text} from "@storybook/addon-knobs";
import ProviderWrapper from "../../../../../.storybook/Provider";
import {store} from "../../../../index";
import {StylesProvider} from "@material-ui/core/styles";
import GlobalStyle from "../../../../Assets/Themes/GlobalStyle";
import {breadcrumbsData} from "../../../../Assets/Elements/HeaderPatient/HeaderPatient.stories";

export default {
    title: 'PatientDataBlock',
    component: PatientDataBlock,
    decorators: [withKnobs, story => <ProviderWrapper store={store}><StylesProvider injectFirst><GlobalStyle
        lang_id={'7'}/>{story()}
    </StylesProvider></ProviderWrapper>],
    excludeStories: /.*Data$/,
}

export const patientData = [{
    id: "1",
    city: "",
    postalCode: "",
    country: "",
    identifier: "5282128650",
    identifierType: "idtype_1",
    firstName: "משה",
    lastName: "לוינשטין",
    middleName: "",
    mobileCellPhone: "0531234567",
    homePhone: "",
    email: "email@email.us",
    gender: "male",
    birthDate: "1972-03-01",
    managingOrganization: 0,
    ageGenderType: "age{m}"
}];
export const normalPatientDataBlock= () => {

    return <PatientDataBlock patientData={object('patientData', [...patientData])}
        // onEditButtonClick={handleEditButtonClick}
        edit_mode={number('edit_mode', 0)} languageDirection={select('languageDirection', {"rtl": "rtl", "ltr": "ltr"},'rtl')}
        formatDate={text("formatDate",'DD/MM/YYYY')}
    />
}
