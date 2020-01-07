import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {connect} from 'react-redux';
import Login from "../Login/Login";
import LoginWithCSRF from "../Login/LoginWithCSRF";
import InitApp from "../Generic/InitApp/InitApp";
import {stateLessOrNot} from "../../Utils/Helpers/StatelessOrNot";
import Imaging from "../Imaging/Imaging";

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                {/*This route is for testing*/}
                {/*<Route path='/' component={Imaging}/>*/}
                {/*This route is for testing*/}
                {console.log(props.history)}
                <Route exact path='/'
                       component={stateLessOrNot() ? Login : LoginWithCSRF}/>
                <PrivateRoute exact path='/InitApp' component={InitApp} isAuth={props.isAuth}/>
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = state => ({isAuth: state.login.isAuth});

export default connect(mapStateToProps, null)(Routes);
