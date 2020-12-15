/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {string} base_64
 * @param {string} contentType
 * @returns {Blob | File}
 */
export const decodeBase_64IntoBlob = (base_64, contentType) => {
  const byteChars = atob(base_64);
  const byteNumbers = new Array(byteChars.length);
  for (
    let byteNumberIndex = 0;
    byteNumberIndex < byteChars.length;
    byteNumberIndex++
  ) {
    byteNumbers[byteNumberIndex] = byteChars.charCodeAt(byteNumberIndex);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};
