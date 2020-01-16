import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";

const apiTokenInstance = () => tokenInstanceGenerator(ApiTokens.API.tokenName);

export const getGlobalSettings = async userID => {
    try {
        return await apiTokenInstance().get(`apis/api/settings/globals/${userID}`);
    } catch (err) {
        console.log(err);
    }
};

export const getMenu = async menuName => {
    try {
        return await apiTokenInstance().get(`apis/api/settings/menu/${menuName}`);
    } catch (err) {
        console.log(err);
    }
};
