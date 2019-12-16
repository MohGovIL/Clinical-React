import React from 'react';
import {LOGIN_START} from '../../../Store/Actions/LoginActions/LoginActionTypes'
import Loader from "../../../Assets/Elements/Loader/Loader";
import StyleLoginBox from "./StyleLoginBox";
const LoginBox = (props) => {
    return (
        <StyleLoginBox>
            <h1>LOGIN</h1>
            <input type="text" placeholder="user name" onChange={props.userNameHandler} value={props.userName}/>
            <input type="password" placeholder="password" onChange={props.passwordHandler}
                   value={props.password}/>
            {props.status !== LOGIN_START ? <input type="submit" value="Login"
                                               onClick={() => props.login()}/> : <Loader/>}
        </StyleLoginBox>
    );
};

export default LoginBox;
