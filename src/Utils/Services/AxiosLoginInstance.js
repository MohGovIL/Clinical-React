import axios from 'axios';
import {basePath} from 'Utils/Helpers/basePath';

const baseURL = basePath();
/**
 * @author Idan Gigi gigiidan@gmail.com
 * @returns {AxiosInstance} Axios instance with base URL used for logging in
 */
export const loginInstance = axios.create({
        baseURL: baseURL
    }
);








