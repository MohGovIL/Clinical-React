import { stateLessOrNot } from 'Utils/Helpers/StatelessOrNot';

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @returns {string} return a baseRoutePath for react-router
 */
export const baseRoutePath = () =>
  stateLessOrNot()
    ? ``
    : `/${process.env.REACT_APP_INSTALL_NAME}/openemr/client-app/dev-mode/build`;
