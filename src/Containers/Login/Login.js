import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login} from "../../store/Actions/actions";
import styles from './Login.module.css';

const Login = (props) => {
    const [userState, userSetState] = useState({userName: "", password: ""});

    const userNameHandler = e => {
        userSetState({...userState, userName: e.target.value});
    };

    const passwordHandler = e => {
        userSetState({...userState, password: e.target.value});
    };

    return (

        <div className={styles.box}>
            <h1>LOGIN</h1>
            <input type="text" placeholder="user name" onChange={userNameHandler} value={userState.userName}/>
            <input type="password" placeholder="password" onChange={passwordHandler}
                   value={userState.password}/>
            <input type="submit" value="Login"
                   onClick={() => props.login(userState.userName, userState.password)}/>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        isAuth: state.login.isAuth
    }
};

export default connect(mapStateToProps, {login})(Login);