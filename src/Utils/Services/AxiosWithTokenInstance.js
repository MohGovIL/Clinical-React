import axios from 'axios';
import {basePath} from "../Helpers/basePath";
import {getKey} from "../Helpers/js_csrf";
import {getToken} from "../Helpers/getToken";

export const tokenInstance = () => {
        const baseURL = basePath();
        const csrf = getKey();
        const token = getToken('accessToken');
        console.log(token + ' TOKEN FROM COOKIE');
        let axiosObj;
        if (process.env.REACT_APP_API_MODE === 'stateless') {
            axiosObj = {
                baseURL,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        } else {
            axiosObj = {
                baseURL,
                headers: {
                    'apicsftoken': csrf
                }
            }
        }
        console.log(axiosObj.headers.Authorization + " HEADER TOKEN");
        return axios.create(axiosObj);

    }
;


// const baseURL = basePath();
// const csrf = getKey();
// const token = getToken('accessToken');
// console.log(token);
// let axiosObj;

// if (process.env.REACT_APP_API_MODE === 'stateless') {
//     axiosObj = {
//         baseURL,
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     }
// } else {
//     axiosObj = {
//         baseURL,
//         headers: {
//             'apicsftoken': csrf
//         }
//     }
// }

// export const tokenInstance = axios.create(axiosObj);
