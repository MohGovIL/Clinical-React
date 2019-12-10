import React from 'react';
import classes from "./LoginBox.module.css";
import Loader from "../../../Assets/Elements/Loader/Loader";

const LoginBox = (props) => {
    return (
        <div className={classes.box}>
            <h1>LOGIN</h1>
            <input type="text" placeholder="user name" onChange={props.userNameHandler} value={props.userName}/>
            <input type="password" placeholder="password" onChange={props.passwordHandler}
                   value={props.password}/>
            {props.status !== "LOGIN" ? <input type="submit" value="Login"
                                               onClick={() => props.login()}/> : <Loader/>}
        </div>
    );
};

export default LoginBox;