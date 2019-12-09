import React from 'react';
import styles from "./LoginBox.module.css";

const LoginBox = (props) => {
    return (
        <div className={styles.box}>
            <h1>LOGIN</h1>
            <input type="text" placeholder="user name" onChange={props.userNameHandler} value={props.userName}/>
            <input type="password" placeholder="password" onChange={props.passwordHandler}
                   value={props.password}/>
            <input type="submit" value="Login"
                   onClick={() => props.login()}/>
        </div>
    );
};

export default LoginBox;