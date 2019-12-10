import axios from 'axios';
import {basePath} from '../Helpers/basePath';
import {getKey} from '../Helpers/js_csrf';
const baseURL = basePath();
const csrf = getKey();



export const loginInstance = axios.create({
        baseURL: baseURL
    }
);


export const tokenInstance = axios.create({
    baseURL: baseURL,
    header: {
        'Authorization': 'hello'
    }

});

// export const loginInstance = axios.create({
//     baseURL: baseURL,
//     headers: {
//         'apicsftoken': csrf
//
//     }
//
// });