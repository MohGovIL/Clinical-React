
export const getKey = () => {
    //for dev mode
    const js_csrf = window.top.csrf_token_js;
    console.log(js_csrf)
    return js_csrf;
};
