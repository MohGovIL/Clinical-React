import {LOGIN} from '../Actions/actionTypes'
import {loginInstance} from '../../axios-Instances/axios';


export const login = (username, password) => {
    return async dispatch => {
        try {
            const userObj = {
                grant_type: "password",
                username,
                password,
                scope: "default"
            };
            const tokenData = await loginInstance.post('auth', userObj);
            document.cookie = `accessToken=${tokenData.data.access_token};`;
            dispatch({type: LOGIN, isAuth: true});
        } catch (err) {
            dispatch({type: LOGIN, isAuth: false});
        }
    }
};