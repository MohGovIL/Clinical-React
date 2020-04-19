import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'Components/PrivateRoute/PrivateRoute';
import {connect} from 'react-redux';
import Login from "Components/Login/Login";
import LoginWithCSRF from "Components/Login/LoginWithCSRF";
import InitApp from "Components/Generic/InitApp/InitApp";
import {stateLessOrNot} from "Utils/Helpers/StatelessOrNot";
import {baseRoutePath} from "Utils/Helpers/baseRoutePath";

const Routes = ({isAuth}) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={`${baseRoutePath()}/`}
                       component={stateLessOrNot() ? Login : LoginWithCSRF}/>
                <PrivateRoute exact path={`${baseRoutePath()}/:clinikal_vertical/:page`} component={InitApp} isAuth={isAuth}/>
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = state => ({isAuth: state.login.isAuth});

export default connect(mapStateToProps, null)(Routes);
