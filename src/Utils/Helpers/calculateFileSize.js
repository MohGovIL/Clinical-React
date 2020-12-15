import { toFix } from './toFix';
/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {number} size
 * @param {number} unitsInBytes
 * @param {number} fix
 * @param {boolean} maxSize default value = false
 */
export const calculateFileSize = (
  size,
  unitsInBytes,
  fix = 1,
  maxSize = false,
) => {
  // If maxSize is not provided it will return undefined as the first parameter
  // other wise true or false if it is bigger than maxSize
  const sizeInUnits = size / unitsInBytes;
  if (!maxSize) {
    return [undefined, toFix(sizeInUnits, fix)];
  } else if (sizeInUnits < maxSize) {
    return [false, toFix(sizeInUnits, fix)];
  } else {
    return [true, toFix(sizeInUnits, fix)];
  }
};
