import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-xhr-backend";
import {getToken} from "../Helpers/getToken"
import {basePath} from "../Helpers/basePath"

// the translations
// (tip move them in a JSON file and import them)

i18n
    .use(backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        backend:{
            //loadPath:`${basePath()}/library/ajax/i18n_generator.php`,
            loadPath:`${basePath()}/${process.env.REACT_APP_INSTALL_NAME}/apis/api/translation/7`,
            crossDomain: false,
            queryStringParams: {
             //   lang_id:7,
                lng:'selected',
                ns:'translation',
                //csrf_token_form:getKey()
            },
            customHeaders: {
                "X-Requested-With": "XMLHttpRequest",
                "apicsrftoken": getToken('csrf_token')
                // ...
            },
            react: {
                useSuspense: false
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

export default i18n;
