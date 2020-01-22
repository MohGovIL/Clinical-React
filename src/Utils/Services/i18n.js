import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import backend from "i18next-xhr-backend";
import {getToken} from "../Helpers/getToken"
import {basePath} from "../Helpers/basePath"
import {stateLessOrNot} from "../Helpers/StatelessOrNot";
import {ApiTokens} from "./ApiTokens";
// the translations
// (tip move them in a JSON file and import them)
/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param lang_id - the language you want to translate the data too
 */
export const geti18n = (lang_id) => {
    let customHeaders = {
        // "X-Requested-With": "XMLHttpRequest", //Not working
    };
    stateLessOrNot() ? customHeaders.Authorization = `${ApiTokens.API.tokenType} ${getToken(ApiTokens.API.tokenName)}` : customHeaders.apicsrftoken = `${getToken(ApiTokens.CSRF.tokenName)}`;
    i18n
        .use(backend)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            fallbackLng: 'en',
            backend: {
                //loadPath:`${basePath()}/library/ajax/i18n_generator.php`,
                loadPath: `${basePath()}apis/api/translation/${lang_id}`,
                crossDomain: true, // CHANGED FROM FALSE *********************
                queryStringParams: {
                    //   lang_id:7,
                    lng: 'selected',
                    ns: 'translation',
                    //csrf_token_form:getKey()
                },
                customHeaders,
                react: {
                    useSuspense: true //changed from FALSE ********************************************
                },
            },
            lng: 'selected',
            debug: true,
            keySeparator: false, // we do not use keys in form messages.welcome
            nsSeparator: false,
            interpolation: {
                escapeValue: false // react already safes from xss
            }
        });
};
// export default i18n;
