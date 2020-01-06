import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {loginAction} from "../../Store/Actions/LoginActions/LoginActions";
import LoginBox from "./LoginBox/LoginBox";
import {stateLessOrNot} from "../../Utils/Helpers/StatelessOrNot";

const Login = (props) => {

    useEffect(() => {
        if(!stateLessOrNot()){
            props.loginAction(null, null, props.history);
        }
    }, []);

    const [userState, userSetState] = useState({userName: "", password: ""});

    const userNameHandler = e => {
        userSetState({...userState, userName: e.target.value});
    };

    const passwordHandler = e => {
        userSetState({...userState, password: e.target.value});
    };

    const loginHandler = () => {
        props.loginAction(userState.userName, userState.password, props.history);
    };


    return (
        <React.Fragment>
            <LoginBox userName={userState.userName} password={userState.password} userNameHandler={userNameHandler}
                      passwordHandler={passwordHandler} login={loginHandler} status={props.status}
            />
        </React.Fragment>
    );
};


const mapStateToProps = state => {
    return {
        isAuth: state.login.isAuth,
        status: state.login.STATUS
    }
};

export default connect(mapStateToProps, {loginAction})(Login);
