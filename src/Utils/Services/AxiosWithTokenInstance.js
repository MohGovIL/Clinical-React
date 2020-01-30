import axios from 'axios';
import {basePath} from "../Helpers/basePath";
import {getToken} from "../Helpers/getToken";
import {stateLessOrNot} from "../Helpers/StatelessOrNot";
import {ApiTokens} from "./ApiTokens";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param tokenName - the token needed for the api
 * @returns {AxiosInstance} Axios instance with the token stored inside the axios instance
 */
export const tokenInstanceGenerator = (tokenName) => {
    const baseURL = basePath();
    let axiosObj = {
        baseURL
    };

    if (stateLessOrNot()) {
        switch (tokenName) {
            case ApiTokens.API.tokenName:
                axiosObj['headers'] = {'Authorization': `${ApiTokens.API.tokenType} ${getToken(ApiTokens.API.tokenName)}`};
                break;
            case ApiTokens.FHIR.tokenName:
                axiosObj['headers'] = {'Authorization': `${ApiTokens.FHIR.tokenType} ${getToken(ApiTokens.FHIR.tokenName)}`};
                break;
            default:
                break;
        }
    } else {
        axiosObj['headers'] = {'apicsrftoken': `${getToken(ApiTokens.CSRF.tokenName)}`};
    }
    return axios.create(axiosObj);
};