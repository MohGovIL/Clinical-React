/*
        Created By Dror Golan - drorgo@matrix.co.il
 */

const parseMultipleExaminations = (serviceType, examination, t) => {
  if (!examination || !examination[0] || examination.lenghth === 0) {
    return t(serviceType);
  }
  let returnThisServiceTypesExaminations = '';
  returnThisServiceTypesExaminations += t(serviceType);
  if (examination.length > 1) {
    returnThisServiceTypesExaminations += ' - ';
    for (let id = 0; id < examination.length; id++) {
      returnThisServiceTypesExaminations +=
        t(examination[id]) + (id + 1 < examination.length ? ', ' : '');
    }
  } else {
    returnThisServiceTypesExaminations += ' - ' + t(examination[0]);
  }
  return returnThisServiceTypesExaminations
    ? returnThisServiceTypesExaminations
    : null;
};

export default parseMultipleExaminations;
