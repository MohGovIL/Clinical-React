import {LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS} from './LoginActionTypes'
import {loginInstance} from '../../../Utils/Services/AxiosLoginInstance';

export const loginStartAction = () => {
    return {
        type: LOGIN_START,
    }
};

export const loginFailedAction = (history) => {
    history.push('/');
    return {
        type: LOGIN_FAILED,
        isAuth: false
    }
};

export const loginSuccessAction = (history) => {
    history.push('/facility');
    return {
        type: LOGIN_SUCCESS,
        isAuth: true
    }
};


export const loginAction = (username, password, history) => {
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
            console.log(tokenData.data.access_token + " SERVER TOKEN");
            document.cookie = `accessToken=${tokenData.data.access_token};`;
            document.cookie = `tokenType=${tokenData.data.token_type};`;
            dispatch(loginSuccessAction(history));
        } catch (err) {
            dispatch(loginFailedAction(history));
        }
    }
};
