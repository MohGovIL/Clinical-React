/**
 * @author Idan Gigi idangi@matrix.co.il
 * @returns {string} Returns the base path of the projects
 */
export const basePath = () => {
    if (typeof process.env.REACT_APP_API_BASE_URL !== 'undefined') {
        return `${window.location.protocol}//${process.env.REACT_APP_API_BASE_URL}/`;
    }
    if (typeof process.env.REACT_APP_API_HOST_PREFIX !== 'undefined') {
        const parseDomain = window.location.hostname.split('.');
        parseDomain.splice(-2, 0, process.env.REACT_APP_API_HOST_PREFIX);
        const domain = parseDomain.join('.');
        return `${window.location.protocol}//${domain}/`;
    } else {
        return `${window.location.protocol}//backend.${window.location.host}/`;
    }
};
