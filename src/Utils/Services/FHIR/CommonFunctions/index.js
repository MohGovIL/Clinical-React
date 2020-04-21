/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - This is the place for the common functions used by all strategies
 */
export const convertParamsToUrl = (obj) => {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}
