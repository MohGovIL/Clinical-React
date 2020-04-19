import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loginAction} from 'Store/Actions/LoginActions/LoginActions'

const LoginWithCsrf = ({history, loginAction}) => {
    useEffect(() => {
        loginAction(null, null, history)
    }, []);

    return (
        <React.Fragment>
        </React.Fragment>
    );
};

export default connect(null, {loginAction})(LoginWithCsrf);
