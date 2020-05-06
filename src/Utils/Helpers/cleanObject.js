import cleanArray from 'Utils/Helpers/cleanArray';

const cleanObject = (object) => {
  //   objTime = objTime + 1;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      console.log(element);
      if (typeof element === 'object') {
        if (Array.isArray(element)) {
          if (!element.length) {
            // console.log(`Deleteting: ${object[key]}`);
            delete object[key];
          } else {
            console.log(`Calling clean array with: ${object[key]}`);
            cleanArray(object[key]);
            console.log(`the array after: ${object[key]}`);
          }
        } else {
          if (!Object.values(element).length) {
            // console.log(`Deleteting: ${object[key]}`);
            delete object[key];
          } else {
            // console.log(`Calling clean object with: ${object[key]}`);
            cleanObject(object[key]);
          }
        }
      }
      if (typeof element === 'string') {
        if (!element.length) {
          // console.log(`Deleteting: ${object[key]}`);
          delete object[key];
        }
      }
    }
  }
};

export default cleanObject;
