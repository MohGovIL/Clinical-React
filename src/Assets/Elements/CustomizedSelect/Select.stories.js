import React from "react";
import CustomizedSelect from "./index";
import {StylesProvider} from '@material-ui/core/styles'
import GlobalStyle from "../../Themes/GlobalStyle";
import {withKnobs, object} from "@storybook/addon-knobs";

export default {
    title: 'Select',
    component: CustomizedSelect,
    decorators: [withKnobs, story => <StylesProvider injectFirst><GlobalStyle lang_id={'7'}/>{story()}
    </StylesProvider>],
    excludeStories: /.*Data$/,
}

export const statusesData = [
    {
        "code": "pending",
        "display": "Pending"
    },
    {
        "code": "booked",
        "display": "Booked"
    },
    {
        "code": "arrived",
        "display": "Arrived"
    },
    {
        "code": "cancelled",
        "display": "Cancelled"
    },
    {
        "code": "noshow",
        "display": "No Show"
    },
    {
        "code": "waitlist",
        "display": "Waitlisted"
    }
];

export const normalSelect = () => {
    return <CustomizedSelect options={object('statuses', [...statusesData])} appointmentId={'2'}
                             value={statusesData[0].code}
                             icon_color={object('Icon color', '#076ce9')}
                             background_color={object('Backgroud color', '#eaf7ff')}
    color={'#076ce9'}/>
};
