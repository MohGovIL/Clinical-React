import React from 'react';
import Switch from 'react-router-dom/Switch'
import {baseRoutePath} from "../../Utils/Helpers/baseRoutePath";
import PatientTracking from "../Imaging/PatientTracking";
import PatientAdmission from "../Imaging/PatientAdmission";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import {connect} from 'react-redux'

const Imaging= ({isAuth}) => {


    return (
        <Switch>
            <PrivateRoute exact path={`${baseRoutePath()}/imaging/patientTracking`} component={PatientTracking} isAuth={isAuth}/>
            <PrivateRoute exact path={`${baseRoutePath()}/imaging/patientAdmission`} component={PatientAdmission} isAuth={isAuth}/>
        </Switch>
    );
};

const mapStateToProps = state => ({isAuth: state.login.isAuth});

export default connect(mapStateToProps, null)(Imaging);
