// const a = { a: '', b: 'a', c: [], d: {}, e: ['a', ''], f: { a: '' } };
import cleanObject from 'Utils/Helpers/cleanObject';
// let objTime = 0;
// let arrTime = 0;

const cleanArray = (array) => {
  //   arrTime = arrTime + 1;
  if (
    array.every(
      (item) =>
        typeof item === 'string' ||
        typeof item === 'number' ||
        typeof item === 'boolean',
    )
  ) {
    array = array.filter(Boolean);
    console.log(`New Arr: ${array}`);
  } else {
    array.forEach((element, elementIndex) => {
      if (typeof element === 'string') {
        if (!element.length) {
          array.splice(elementIndex, 1);
        }
      }
      if (typeof element === 'object') {
        if (Array.isArray(element)) {
          if (!element.length) {
            array.splice(elementIndex, 1);
          } else {
            cleanArray(element);
          }
        } else {
          if (!Object.values(element).length) {
            array.splice(elementIndex, 1);
          } else {
            cleanObject(element);
          }
        }
      }
    });
  }
};

export default cleanArray;
// cleanObject(a);
// console.log(a);
