import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {baseRoutePath} from "../../Utils/Helpers/baseRoutePath";
import {useRouteMatch} from 'react-router-dom';
import PatientTracking from "../Imaging/PatientTracking";

const ImagingRoute = (props) => {

    const {path, url} = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${baseRoutePath()}/imaging/patientTracking`} component={PatientTracking} />
            <Route exact path={`${baseRoutePath()}/imaging/patientAdmission`} component/>
        </Switch>
    );
};

export default ImagingRoute;
