import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {baseRoutePath} from "../../Utils/Helpers/baseRoutePath";

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
    return (
        <React.Fragment>
            <Route {...rest} render={props => isAuth ? (<Component {...props}/>) : (<Redirect to={`${baseRoutePath()}`} />)}/>
        </React.Fragment>
    )
};



export default PrivateRoute;
