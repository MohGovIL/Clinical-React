import axios from 'axios';

export const loginInstance = axios.create({
    baseURL: 'http://localhost/vac_2/openemr/apis/api/',
    headers: {'Access-Control-Allow-Origin': '*'}
});

