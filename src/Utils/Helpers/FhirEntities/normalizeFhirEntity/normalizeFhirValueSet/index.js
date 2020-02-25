/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param valueSetObj
 * @returns {code: *, name: *}
 */
const normalizeFhirValueSet = valueSetObj => {
    return {
        code: isNaN(parseInt(valueSetObj.code)) ? valueSetObj.code : parseInt(valueSetObj.code),
        name: valueSetObj.display,
    }
};

export default normalizeFhirValueSet;
