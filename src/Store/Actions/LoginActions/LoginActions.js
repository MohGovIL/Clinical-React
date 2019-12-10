import {LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS} from './LoginActionTypes'
import {loginInstance} from '../../../Utils/Services/ApiAxios';


export const loginStartAction = () => {
    return {
        type: LOGIN_START,
    }
};

export const loginFailedAction = () => {
    return {
        type: LOGIN_FAILED,
        isAuth: false
    }
};

export const loginSuccessAction = () => {
    return {
        type: LOGIN_SUCCESS,
        isAuth: true
    }
};


export const loginAction = (username, password) => {
    return async dispatch => {
        dispatch(loginStartAction());
        try {
            const userObj = {
                grant_type: "password",
                username,
                password,
                scope: "default"
            };
            const tokenData = await loginInstance.post('api/auth', userObj);
            document.cookie = `accessToken=${tokenData.data.access_token};`;
            document.cookie = `tokenType=${tokenData.data.token_type};`;
            console.log(tokenData);
            dispatch(loginSuccessAction());
        } catch (err) {
            dispatch(loginFailedAction());
        }
    }
};
