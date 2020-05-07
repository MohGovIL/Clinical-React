/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param patient {object}
 * @returns {object}
 */
const normalizeFhirPatient = (patient) => {
  let middleName = '';
  let mobileCellPhone = '';
  let homePhone = '';
  let email = '';
  let firstName = '';
  let lastName = '';
  let identifier = '';
  let identifierType = '';
  let city = '';
  let postalCode = '';
  let country = '';
  let managingOrganization = '';
  let identifierTypeText = '';
  let streetName = '';
  let streetNumber = '';
  let POBox = '';

  if (patient.address.length) {
    city = patient.address[0].city;
    postalCode = patient.address[0].postalCode;
    country = patient.address[0].country;
    if (patient.address[0].type) {
      switch (patient.address[0].type) {
        case 'both':
          streetName = patient.address[0].line[0];
          if (patient.address[0].line.length > 2) {
            streetNumber = patient.address[0].line[1];
            POBox = patient.address[0].line[2];
          } else {
            POBox = patient.address[0].line[1];
          }
          break;
        case 'postal':
          POBox = patient.address[0].line[0];
          break;
        case 'physical':
          streetName = patient.address[0].line[0];
          streetNumber = patient.address[0].line[1];
          break;
        default:
          break;
      }
    }
  }
  let ageGenderType = '';

  if (patient.identifier.length) {
    if (patient.identifier[0].type) {
      identifierTypeText = patient.identifier[0].type.text;
      if (patient.identifier[0].type.coding) {
        identifierType =
          patient.identifier[0].type.coding.length &&
          patient.identifier[0].type.coding[0].code;
      }
    }
    if (patient.identifier[0].value) {
      identifier = patient.identifier[0].value;
    }
  }
  if (
    patient.managingOrganization &&
    patient.managingOrganization.reference &&
    patient.managingOrganization.reference.length > 0
  ) {
    managingOrganization = patient.managingOrganization
      ? patient.managingOrganization.reference.split('/')[1]
      : null;
  }

  if (patient.name) {
    lastName = patient.name[0].family;
    if (patient.name[0].given) {
      firstName = patient.name[0].given[0];
      if (patient.name[0].given.length > 2) {
        middleName = patient.name[0].given.join(' ');
      } else {
        middleName = patient.name[0].given[1];
      }
    }
  }
  if (patient.telecom) {
    const thereIsMobilePhone = patient.telecom.filter(
      (telecomObj) =>
        telecomObj.system === 'phone' && telecomObj.use === 'mobile',
    );
    mobileCellPhone = thereIsMobilePhone.length
      ? thereIsMobilePhone[0].value
      : '';

    const thereIsEmail = patient.telecom.filter(
      (telecomObj) => telecomObj.system === 'email',
    );
    email = thereIsEmail.length ? thereIsEmail[0].value : '';

    const thereIsHomePhone = patient.telecom.filter(
      (telecomObj) =>
        telecomObj.system === 'phone' && telecomObj.use === 'home',
    );
    homePhone = thereIsHomePhone.length ? thereIsHomePhone[0].value : '';
  }

  ageGenderType = patient.gender === 'female' ? 'age{f}' : 'age{m}';

  return {
    id: patient.id,
    city,
    postalCode,
    country,
    identifier,
    identifierType,
    firstName,
    lastName,
    middleName,
    mobileCellPhone,
    homePhone,
    email,
    gender: patient.gender,
    birthDate: patient.birthDate,
    managingOrganization,
    ageGenderType,
    streetName,
    streetNumber,
    POBox,
    identifierTypeText,
  };
};

export default normalizeFhirPatient;
