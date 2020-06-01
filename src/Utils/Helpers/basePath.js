/**
 * @author Idan Gigi idangi@matrix.co.il
 * @returns {string} Returns the base path of the projects
 */
export const basePath = () => {
    if(typeof process.env.REACT_APP_API_BASE_URL !== 'undefined')
        return `${window.location.protocol}//${process.env.REACT_APP_API_BASE_URL}/`;
    else
        return `${window.location.protocol}//backend.${window.location.host}/`;
};
