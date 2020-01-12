import axios from 'axios';
import {basePath} from "../Helpers/basePath";
import {getToken} from "../Helpers/getToken";
import {stateLessOrNot} from "../Helpers/StatelessOrNot";

export const tokenInstance = () => {
    const baseURL = basePath();
    let token;
    let axiosObj;
    if (stateLessOrNot()) {
        token = getToken('accessToken');
        axiosObj = {
            baseURL,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    } else {
        token = getToken('csrf_token');
        axiosObj = {
            baseURL,
            headers: {
                'apicsrftoken': token
            }
        }
    }
    console.log(token + ' TOKEN FROM COOKIE');
    return axios.create(axiosObj);

};



