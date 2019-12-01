import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-xhr-backend";
import {getKey} from "./helpers/js_csrf"
import {basePath} from "./helpers/basePath"

// the translations
// (tip move them in a JSON file and import them)

i18n
    .use(backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        backend:{
            loadPath:`${basePath()}/library/ajax/i18n_generator.php`,
            crossDomain: false,
            queryStringParams: {
                lang_id:7,
                lng:'selected',
                ns:'translation',
                csrf_token_form:getKey()
            },
            customHeaders: {
                "X-Requested-With": "XMLHttpRequest",
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
