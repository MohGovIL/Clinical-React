import {tokenInstance} from "./AxiosWithTokenInstance";

export const getGlobalSettings = async userID => {
    try {
        const {data} = await tokenInstance().get(`apis/api/settings/globals/${userID}`);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getMenu = async menuName => {
    try {
        const {data} = await tokenInstance().get(`apis/api/settings/menu/${menuName}`);
        return data;
    } catch (err) {
        console.log(err);
    }
};


