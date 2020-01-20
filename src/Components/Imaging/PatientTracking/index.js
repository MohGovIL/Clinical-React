import React from 'react';
import PatientTrackingStyle from './Style';
import {devicesValue} from "../../../Assets/Themes/BreakPoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FilterBox from "../../../Assets/Elements/FilterBox";

const PatientTracking = (props) => {
    const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);

    return (
        <PatientTrackingStyle desktop={matches}>
            <FilterBox desktop={matches}/>
        </PatientTrackingStyle>
    );
};

export default PatientTracking;
