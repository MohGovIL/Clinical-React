import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {baseRoutePath} from "../../Utils/Helpers/baseRoutePath";
import {useRouteMatch} from 'react-router-dom';
import PatientTracking from "../Imaging/PatientTracking";

const ImagingRoute = (props) => {

    const {path, url} = useRouteMatch();
    return (
        <Switch>
            <Route path={`${baseRoutePath()}/imaging/patientTracking`} component={PatientTracking} />
        </Switch>
    );
};

export default ImagingRoute;
