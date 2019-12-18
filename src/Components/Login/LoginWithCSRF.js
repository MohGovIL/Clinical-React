import React from 'react';
import {connect} from 'react-redux';
import {loginAction} from '../../Store/Actions/LoginActions/LoginActions'

const LoginWithCsrf = (props) => {
    return (
        <React.Fragment>
            {props.loginAction(null, null, props.history)}
        </React.Fragment>
    );
};

export default connect(null, {loginAction})(LoginWithCsrf);