import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginAction} from "../../Store/Actions/LoginActions/LoginActions";
import LoginBox from './LoginBox/LoginBox';

const Login = (props) => {
    const [userState, userSetState] = useState({userName: "", password: ""});

    const userNameHandler = e => {
        userSetState({...userState, userName: e.target.value});
    };

    const passwordHandler = e => {
        userSetState({...userState, password: e.target.value});
    };

    const loginHandler = () => {
        props.loginAction(userState.userName, userState.password);
    };

    return (
        <LoginBox userName={userState.userName} password={userState.password} userNameHandler={userNameHandler}
                  passwordHandler={passwordHandler} login={loginHandler}/>
    );
};


const mapStateToProps = state => {
    return {
        isAuth: state.login.isAuth
    }
};

export default connect(mapStateToProps, {loginAction})(Login);