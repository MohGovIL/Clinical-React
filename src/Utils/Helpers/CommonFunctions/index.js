/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - This is the place for the common functions used by all strategies
 */
export const convertParamsToUrl = (obj) => {
  var str = '';
  for (var key in obj) {
    if (str !== '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
};

export const arrayRemove = (arr, value) => {
  return arr.filter(function (ele) {
    return ele !== value;
  });
};

const stripHtml = (html) => {
  var tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
