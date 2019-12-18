import axios from 'axios';
import {basePath} from "../Helpers/basePath";
import {getToken} from "../Helpers/getToken";

export const tokenInstance = () => {
        const baseURL = basePath();
        let token;
        let axiosObj;
        if (process.env.REACT_APP_API_MODE === 'stateless') {
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