/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} relatedPerson
 * @returns {object} denormalizedRelatedPerson
 */
const denormalizeRelatedPerson = (relatedPerson) => {
  const telecom = [];
  const identifierObj = {};
  const denormalizedRelatedPerson = {};
  for (const relatedPersonKey in relatedPerson) {
    if (relatedPerson.hasOwnProperty(relatedPersonKey)) {
      switch (relatedPersonKey) {
        case 'name':
          denormalizedRelatedPerson['name'] = [
            {
              text: relatedPerson[relatedPersonKey],
            },
          ];
          break;
        case 'active':
          denormalizedRelatedPerson['active'] = relatedPerson[relatedPersonKey];
          break;
        case 'patient':
          denormalizedRelatedPerson['patient'] = {
            reference: `Patient/${relatedPerson[relatedPersonKey]}`,
          };
          break;
        case 'email':
          telecom.push({
            system: 'email',
            value: relatedPerson[relatedPersonKey],
          });
          break;
        case 'mobilePhone':
          telecom.push({
            system: 'phone',
            value: relatedPerson[relatedPersonKey],
            use: 'mobile',
          });
          break;
        case 'homePhone':
          telecom.push({
            system: 'phone',
            value: relatedPerson[relatedPersonKey],
            use: 'home',
          });
          break;
        case 'relationship':
          denormalizedRelatedPerson['relationship'] = [
            {
              coding: [
                {
                  code: relatedPerson[relatedPersonKey],
                },
              ],
            },
          ];
          break;
        case 'identifierType':
          identifierObj['type'] = {
            coding: [
              {
                code: relatedPerson[relatedPersonKey],
              },
            ],
          };
          break;
        case 'identifier':
          identifierObj['value'] = relatedPerson[relatedPersonKey];
          break;
        case 'gender':
          denormalizedRelatedPerson['gender'] = relatedPerson[relatedPersonKey];
          break;
        default:
          break;
      }
    }
  }
  if (relatedPerson.identifierType || relatedPerson.identifier) {
    denormalizedRelatedPerson['identifier'] = { ...identifierObj };
  }

  if (telecom.length) {
    denormalizedRelatedPerson['telecom'] = telecom;
  }
  return denormalizedRelatedPerson;
};

export default denormalizeRelatedPerson;
