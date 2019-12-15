import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
    return (
        <React.Fragment>
            <Route {...rest} render={props => isAuth ? (<Component {...props}/>) : (<Redirect to="/"/>)}/>
        </React.Fragment>
    )
};



export default PrivateRoute;