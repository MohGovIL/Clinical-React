import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import backend from "i18next-xhr-backend";
import {getToken} from "../Helpers/getToken"
import {basePath} from "../Helpers/basePath"
import {stateLessOrNot} from "../Helpers/StatelessOrNot";

// the translations
// (tip move them in a JSON file and import them)

export const geti18n = (lang_id) => {
    let customHeaders = {
        "X-Requested-With": "XMLHttpRequest",
    };
    stateLessOrNot() ? customHeaders.Authorization = `Bearer ${getToken('accessToken')}` : customHeaders.apicsrftoken = `${getToken('csrf_token')}`;
    i18n
        .use(backend)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
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
