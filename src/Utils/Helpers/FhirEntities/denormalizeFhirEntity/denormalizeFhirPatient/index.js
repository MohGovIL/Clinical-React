/**
 * @author Idan Gigi idangi@matrix.co.il, Yuriy Gershem yuriyge@matrix.co.il
 * @param {object} patient
 * @returns {object} denormalizationFhirPatient
 */
const denormalizeFhirPatient = (patient) => {
  const telecom = [];
  const identifierObj = {};
  const identifierObjType = {};
  const name = {};
  const denormalizedPatient = {};
  const addressObj = {};
  const addressLine = [];
  let addressType = '';

  if (patient['POBox']) {
    if (patient['streetName']) {
      addressType = 'both';
    } else {
      addressType = 'postal';
    }
  } else {
    addressType = 'physical';
  }

  for (const patientKey in patient) {
    if (patient.hasOwnProperty(patientKey)) {
      switch (patientKey) {
        case 'birthDate':
          denormalizedPatient['birthDate'] = patient[patientKey];
          break;
        case 'managingOrganization':
          denormalizedPatient['managingOrganization'] = {
            reference: `Organization/${patient[patientKey]}`,
          };
          break;
        case 'email':
          telecom.push({
            system: 'email',
            value: patient[patientKey],
          });
          break;
        case 'mobileCellPhone':
          telecom.push({
            system: 'phone',
            value: patient[patientKey],
            use: 'mobile',
          });
          break;
        case 'homePhone':
          telecom.push({
            system: 'phone',
            value: patient[patientKey],
            use: 'home',
          });
          break;
        case 'firstName':
          name['given'] = [patient[patientKey]];
          break;
        case 'lastName':
          name['family'] = patient[patientKey];
          break;
        case 'identifierType':
          identifierObjType['coding'] = [
            {
              code: patient[patientKey],
            },
          ];
          break;
        case 'identifierTypeText':
          identifierObjType['text'] = patient[patientKey];
          break;
        case 'identifier':
          identifierObj['value'] = patient[patientKey];
          break;
        case 'gender':
          denormalizedPatient['gender'] = patient[patientKey];
          break;
        case 'city':
          addressObj['city'] = patient[patientKey];
          break;
        case 'postalCode':
          addressObj['postalCode'] = patient[patientKey];
          break;
        case 'country':
          addressObj['country'] = patient[patientKey];
          break;
        case 'addressType':
          if (addressType) {
            addressObj['type'] = addressType;
          }
          break;
        case 'streetName':
          if (addressType) {
            if (addressType === 'both' || addressType === 'physical') {
              addressLine[0] = patient[patientKey];
            }
          }
          break;
        case 'streetNumber':
          if (addressType) {
            if (addressType === 'both' || addressType === 'physical') {
              addressLine[1] = patient[patientKey];
            }
          }
          break;
        case 'POBox':
          if (addressType) {
            if (addressType === 'both') {
              if (patient['streetNumber']) {
                addressLine[2] = patient[patientKey];
              } else {
                addressLine[1] = patient[patientKey];
              }
            } else if (addressType === 'postal') {
              addressLine[0] = patient[patientKey];
            }
          }
          break;
        default:
          break;
      }
    }
  }

  if (Object.keys(identifierObjType).length) {
    identifierObj['type'] = identifierObjType;
  }

  if (patient.identifierType || patient.identifier) {
    denormalizedPatient['identifier'] = [{ ...identifierObj }];
  }

  if (telecom.length > 0) {
    denormalizedPatient['telecom'] = telecom;
  }

  if (patient.firstName || patient.lastName) {
    denormalizedPatient['name'] = [{ ...name }];
  }
  if (addressLine.length) {
    addressObj['line'] = addressLine;
  }
  if (Object.keys(addressObj).length) {
    denormalizedPatient['address'] = [addressObj];
  }
  return denormalizedPatient;
};

export default denormalizeFhirPatient;
