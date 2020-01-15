import {tokenInstance} from "./AxiosWithTokenInstance";

export const getGlobalSettings = async userID => {
    try {
        return await tokenInstance().get(`apis/api/settings/globals/${userID}`);
    } catch (err) {
        console.log(err);
    }
};

export const getMenu = async menuName => {
    try {
        return await tokenInstance().get(`apis/api/settings/menu/${menuName}`);
    } catch (err) {
        console.log(err);
    }
};
