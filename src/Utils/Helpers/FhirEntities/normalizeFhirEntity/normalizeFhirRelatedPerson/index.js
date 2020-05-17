/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} relatedPerson
 * @returns {object}
 */
const normalizeFhirRelatedPerson = (relatedPerson) => {
  let active = '';
  let patient = '';
  let email = '';
  let mobilePhone = '';
  let homePhone = '';
  let relationship = '';
  let identifierType = '';
  let identifier = '';
  let id = '';
  let gender = '';

  if (
    relatedPerson.patient &&
    relatedPerson.patient.reference &&
    relatedPerson.patient.reference.split('/')[1].length
  ) {
    patient = relatedPerson.patient.reference.split('/')[1];
  }
  if (relatedPerson.telecom && relatedPerson.telecom.length) {
    relatedPerson.telecom.forEach((telecomObj) => {
      if (telecomObj.system) {
        if (telecomObj.system === 'phone') {
          if (telecomObj.use === 'home') {
            homePhone = telecomObj.value;
          }
          if (telecomObj.use === 'mobile') {
            mobilePhone = telecomObj.value;
          }
        }
        if (telecomObj.system === 'email') {
          email = telecomObj.value;
        }
      }
    });
  }
  if (relatedPerson.relationship && relatedPerson.relationship.length) {
    if (
      relatedPerson.relationship[0].coding &&
      relatedPerson.relationship[0].coding.length
    ) {
      relationship = relatedPerson.relationship[0].coding[0].code;
    }
  }
  if (relatedPerson.identifier && relatedPerson.identifier.length) {
    if (relatedPerson.identifier[0].value) {
      identifier = relatedPerson.identifier[0].value;
    }
    if (relatedPerson.identifier[0].type) {
      if (
        relatedPerson.identifier[0].type.coding &&
        relatedPerson.identifier[0].type.coding.length
      ) {
        if (relatedPerson.identifier[0].type.coding[0].code) {
          identifierType = relatedPerson.identifier[0].type.coding[0].code;
        }
      }
    }
  }
  return {
    id: relatedPerson.id || id,
    active: relatedPerson.active || active,
    gender: relatedPerson.gender || gender,
    patient,
    email,
    mobilePhone,
    homePhone,
    relationship,
    identifierType,
    identifier,
  };
};

export default normalizeFhirRelatedPerson;
