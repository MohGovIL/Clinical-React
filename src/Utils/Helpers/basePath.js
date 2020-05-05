/**
 * @author Idan Gigi gigiidan@gmail.com
 * @returns {string} Returns the base path of the projects
 */
export const basePath = () => {
        return `${window.location.protocol}//${process.env.API_BASE_URL}/`;
};
