/**
 * @author Idan Gigi gigiidan@gmail.com
 * @returns {boolean} If the application is in stateless(stored in .env.development.local) mode returns
 * true otherwise return false
 */
export const stateLessOrNot = () =>
  process.env.REACT_APP_API_MODE === 'stateless';
