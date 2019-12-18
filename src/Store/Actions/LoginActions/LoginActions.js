import {LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_SUCCESS, LOGOUT_START} from './LoginActionTypes'
import {loginInstance} from '../../../Utils/Services/AxiosLoginInstance';

export const logoutStartAction = () => {
    return {
        type: LOGOUT_START
    }
};

export const logoutSuccessAction = () => {
    return {
        type: LOGOUT_SUCCESS,
        isAuth: false
    }
};

export const logoutFailedAction = () => {
    return {
        type: LOGOUT_FAILED
    }
};

export const logoutAction = () => {
    return async dispatch => {
        dispatch(logoutStartAction());
        try {
            document.cookie = `accessToken=''`;
            document.cookie = `tokenType=''`;
            document.cookie = `csrf_token=''`;
            dispatch(logoutSuccessAction());
        } catch (err) {
            dispatch(logoutFailedAction());
        }
    }
};

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

export const loginAction = (username, password, history) => {
    return async dispatch => {
        dispatch(loginStartAction());
        try {
            let tokenData;
            const userObj = {
                grant_type: "password",
                username,
                password,
                scope: "default"
            };
            if (process.env.REACT_APP_API_MODE === 'stateless') {
                tokenData = await loginInstance.post('apis/api/auth', userObj);
                document.cookie = `accessToken=${tokenData.data.access_token};`;
                document.cookie = `tokenType=${tokenData.data.token_type};`;
            } else {
                //TODO
                //access TOKEN problem saves it twice change the name to csrf_token and token
                tokenData = await loginInstance.get('interface/modules/zend_modules/public/clinikal-api/get-csrf-token');
                document.cookie = `csrf_token=${tokenData.data.csrf_token}`;
            }
            dispatch(loginSuccessAction(history));
            history.push('/facility');
        } catch (err) {
            dispatch(loginFailedAction(history));
            history.push('/');
        }
    }
};
