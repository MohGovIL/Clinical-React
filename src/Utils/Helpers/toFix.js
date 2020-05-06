/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param {number} number
 * @param {number} fix
 */
export const toFix = (number, fix) => {
  return Number.parseFloat(number).toFixed(1);
};
