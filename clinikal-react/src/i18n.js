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

export const xl = function(string) {
    if (typeof top.i18next.t == 'function') {
        return top.i18next.t(string);
    } else {
        // Unable to find the i18next.t function, so log error
        console.log("xl function is unable to translate since can not find the i18next.t function");
        return string;
    }
}

/*export function setupI18n(lang_id) {

    return fetch( "http://localhost/poc_react/openemr/library/ajax/i18n_generator.php?lang_id=" + encodeURIComponent(lang_id) +  , {
        credentials: 'same-origin',
        method: 'GET'
    })
.then(response => response.json())
}*/
