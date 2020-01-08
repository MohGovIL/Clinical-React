import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loginAction} from '../../Store/Actions/LoginActions/LoginActions'

const LoginWithCsrf = (props) => {
    useEffect(() => {
        props.loginAction(null, null, props.history)
    }, []);

    return (
        <React.Fragment>
        </React.Fragment>
    );
};

export default connect(null, {loginAction})(LoginWithCsrf);
