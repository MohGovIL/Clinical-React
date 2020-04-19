import React from 'react';
import {LOGIN_START} from 'Store/Actions/LoginActions/LoginActionTypes'
import LoginStyleBox from "./LoginBoxStyle";


const LoginBox = (props) => {
    return (
        <LoginStyleBox>
            <h1>LOGIN</h1>
            <input type="text" placeholder="user name" onChange={props.userNameHandler} value={props.userName}/>
            <input type="password" placeholder="password" onChange={props.passwordHandler}
                   value={props.password}/>
            {props.status !== LOGIN_START ? <input type="submit" value="Login"
                                                   onClick={() => props.login()}/> : <p>Insert Loader</p>}
        </LoginStyleBox>
    );
};

export default LoginBox;

// import styles from './LoginBox.module.css';

// const LoginBox = (props) => {
//     return (
//         <div className={styles.box}>
//             <h1>LOGIN</h1>
//             <input type="text" placeholder="user name" onChange={props.userNameHandler} value={props.userName}/>
//             <input type="password" placeholder="password" onChange={props.passwordHandler}
//                    value={props.password}/>
//             {props.status !== LOGIN_START ? <input type="submit" value="Login"
//                                                    onClick={() => props.login()}/> : <Index/>}
//         </div>
//     );
// };
//
// export default LoginBox;
