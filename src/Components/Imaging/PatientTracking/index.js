import React from 'react';
import PatientTrackingStyle from './Style';
import {devicesValue} from "../../../Assets/Themes/BreakPoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppointmentsStatusFilterBox from "../../../Assets/Elements/AppointmentsStatusFilterBox";
import AppointmentsTable from "../../../Assets/Elements/AppointmentsTable";

const PatientTracking = ({appointments}) => {
    const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);

    return (
        <PatientTrackingStyle desktop={matches}>
            <AppointmentsStatusFilterBox desktop={matches}/>
            <AppointmentsTable appointments={appointments}/>
        </PatientTrackingStyle>
    );
};

export default PatientTracking;
