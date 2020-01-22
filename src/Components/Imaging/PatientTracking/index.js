import React from 'react';
import PatientTrackingStyle from './Style';
import {devicesValue} from "../../../Assets/Themes/BreakPoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppointmentsStatusFilterBox from "../../../Assets/Elements/AppointmentsStatusFilterBox";

const PatientTracking = (props) => {
    const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);

    return (
        <PatientTrackingStyle desktop={matches}>
            <AppointmentsStatusFilterBox desktop={matches}/>
        </PatientTrackingStyle>
    );
};

export default PatientTracking;
