import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {connect} from 'react-redux';
import Login from "../Login/Login";
import LoginWithCSRF from "../Login/LoginWithCSRF";
import InitApp from "../Generic/InitApp/InitApp";
import {stateLessOrNot} from "../../Utils/Helpers/StatelessOrNot";
import Imaging from "../Imaging/Imaging";
import {baseRoutePath} from "../../Utils/Helpers/baseRoutePath";

const Routes = ({isAuth}) => {
    return (
        <BrowserRouter>
            <Switch>
                {/*This route is for testing*/}
                {/*<Route path='/' component={Imaging}/>*/}
                {/*This route is for testing*/}
                <Route exact path={`${baseRoutePath()}/`}
                       component={stateLessOrNot() ? Login : LoginWithCSRF}/>
                <PrivateRoute exact path={`${baseRoutePath()}/:clinikal_vertical`} component={InitApp} isAuth={isAuth}/>
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = state => ({isAuth: state.login.isAuth});

export default connect(mapStateToProps, null)(Routes);
