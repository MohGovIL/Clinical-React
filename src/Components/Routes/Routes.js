import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {connect} from 'react-redux';
import Login from "../Login/Login";
import GetData from "../GetData/GetData";
import LoginWithCSRF from "../Login/LoginWithCSRF";
const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={process.env.REACT_APP_API_MODE === 'stateless'? Login : LoginWithCSRF}/>
                <PrivateRoute exact path='/facility' component={GetData} isAuth={props.isAuth}/>
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = state => ({isAuth: state.login.isAuth});

export default connect(mapStateToProps, null)(Routes);
