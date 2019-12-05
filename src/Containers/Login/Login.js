import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from "../../store/Actions/actions";
import styles from './Login.module.css';

class Login extends Component {
    state = {
        userName: "",
        password: ""
    };

    userNameHandler = e => {
        this.setState({userName: e.target.value})
    };

    passwordHandler = e => {
        this.setState({password: e.target.value})
    };


    /*TODO
    3. how to make it possible to have a session at the same time (for the IFrame).
    DOING
    DOING
    DONE
    2. find the relevant api to get the TOKEN.
    4. set axios infrastructure
    1. set login component
    2. set redux infrastructure
    */

    render() {
        return (

            <div className={styles.box}>
                <h1>LOGIN</h1>
                <input type="text" placeholder="user name" onChange={this.userNameHandler} value={this.state.userName}/>
                <input type="password" placeholder="password" onChange={this.passwordHandler}
                       value={this.state.password}/>
                <input type="submit" value="Login"
                       onClick={() => this.props.login(this.state.userName, this.state.password)}/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuth: state.login.isAuth
    }
};

export default connect(mapStateToProps, {login})(Login);