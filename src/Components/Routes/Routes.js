import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {connect} from 'react-redux';
import Login from "../Login/Login";
import GetData from "../GetData/GetData";

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Login}/>
            <PrivateRoute exact path='/facility' component={GetData} isAuth={props.isAuth}/>
        </BrowserRouter>
    );
};

const mapStateToProps = state => ({isAuth: state.login.isAuth});

export default connect(mapStateToProps, null)(Routes);