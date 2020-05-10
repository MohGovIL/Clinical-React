/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param cookieName - string of the cookie name
 * @returns {string} If found the given cookieName returns it otherwise return an empty string ""
 */
export const getToken = (cookieName) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let cookieIndex = 0; cookieIndex < cookieArray.length; cookieIndex++) {
    let cookieItem = cookieArray[cookieIndex];
    while (cookieItem.charAt(0) === ' ') {
      cookieItem = cookieItem.substring(1);
    }
    if (cookieItem.indexOf(name) === 0) {
      return cookieItem.substring(name.length, cookieItem.length);
    }
  }
  return '';
};
