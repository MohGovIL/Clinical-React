import axios from 'axios';
import {basePath} from '../Helpers/basePath';

const baseURL = basePath();


export const loginInstance = axios.create({
        baseURL: baseURL
    }
);








