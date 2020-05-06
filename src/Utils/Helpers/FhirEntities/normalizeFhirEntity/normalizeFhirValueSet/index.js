/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param valueSetObj
 * @returns {code: *, name: *}
 */

const normalizeFhirValueSet = (valueSetObj) => {
  return {
    code: valueSetObj.code,
    name: valueSetObj.display,
  };
};

export default normalizeFhirValueSet;
