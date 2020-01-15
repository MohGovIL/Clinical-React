import {LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_SUCCESS, LOGOUT_START} from './LoginActionTypes'
import {loginInstance} from '../../../Utils/Services/AxiosLoginInstance';
import {stateLessOrNot} from "../../../Utils/Helpers/StatelessOrNot";
import {getSettingsAction} from "../SettingsActions/SettingsActions";
import {basePath} from "../../../Utils/Helpers/basePath";

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
            if(!stateLessOrNot()){
                window.location = `${basePath()}interface/logout.php`
            }
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

export const loginSuccessAction = (userID) => {
    return {
        type: LOGIN_SUCCESS,
        isAuth: true,
        userID
    }
};

export const loginAction = (username, password, history) => {
    return async dispatch => {
        dispatch(loginStartAction());
        try {
            let tokenData;
            if (stateLessOrNot()) {
                const userObj = {
                    grant_type: "password",
                    username,
                    password,
                    scope: "default"
                };
                tokenData = await loginInstance.post('apis/api/auth', userObj);
                document.cookie = `accessToken=${tokenData.data.access_token};`;
                document.cookie = `tokenType=${tokenData.data.token_type};`;
            } else {
                tokenData = await loginInstance.get('interface/modules/zend_modules/public/clinikal-api/get-csrf-token');
                document.cookie = `csrf_token=${tokenData.data.csrf_token}`;
            }
            dispatch(loginSuccessAction(tokenData.data?.user_data?.user_id));
            dispatch(getSettingsAction(history, tokenData.data?.user_data?.user_id));
        } catch (err) {
            dispatch(loginFailedAction());
            /*Optional solution dispatch logoutAction and add the 'else' below to logoutAction
            (not really necessary cuz Auth is false and PrivateRoute got it covered)
            */
            if(!stateLessOrNot()){
                window.location = `${basePath()}interface/logout.php`
            }else{
                history.push('/');
            }
        }
    }
};
