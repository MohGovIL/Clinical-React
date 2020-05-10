/**
 * @author Idan Gigi idangi@matrix.co.il
 * @returns {string} Returns the base path of the projects
 */
export const basePath = () => {
  return `${window.location.protocol}//${window.location.host}/${process.env.REACT_APP_INSTALL_NAME}/openemr/`;
};
