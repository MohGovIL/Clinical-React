/**
 * @author Idan Gigi idangi@matrix.co.il
 * @returns {boolean} If the application is in stateless(stored in .env.development.local) mode returns
 * true otherwise return false
 */
export const stateLessOrNot = () => process.env.REACT_APP_API_MODE === 'stateless';
