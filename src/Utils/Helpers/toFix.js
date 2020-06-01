/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {number} number
 * @param {number} fix
 */
export const toFix = (number, fix) => {
  return Number.parseFloat(number).toFixed(1);
};
