/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {string} amount
 * @returns {string} 1000 => 1,000.00, 1,000,000.123 => 1,000,000.12
 */
export const formatToCurrency = (amount) => {
  return amount.length
    ? Number.parseFloat(amount.replace(/,/g, ''))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    : 0;
};
