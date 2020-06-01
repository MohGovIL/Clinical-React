/**
 * @author Idan Gigi - idangi@matrix.co.il
 */

import { CRUDOperations } from '../CRUDOperations/index';
import denormalizeRelatedPerson from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirRelatedPerson';

const RelatedPersonStats = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/RelatedPerson';
    parameters.url = componentFhirURL;
    return RelatedPersonStats[parameters.functionName](parameters);
  },
  getRelatedPerson: (params) => {
    return CRUDOperations(
      'search',
      `${params.url}/${params.functionParams.RelatedPersonId}`,
    );
  },
  createRelatedPerson: (params) => {
    const denormalizedRelatedPerson = denormalizeRelatedPerson(
      params.functionParams.relatedPersonParams,
    );
    return CRUDOperations('create', `${params.url}`, denormalizedRelatedPerson);
  },
  updateRelatedPerson: (params) => {
    const patchArr = [];
    for (const dataKey in params.functionParams.relatedPersonParams) {
      if (params.functionParams.relatedPersonParams.hasOwnProperty(dataKey)) {
        switch (dataKey) {
          case 'active':
            patchArr.push({
              op: 'replace',
              path: '/active',
              value: params.functionParams.relatedPersonParams[dataKey],
            });
            break;
          case 'patient':
            patchArr.push({
              op: 'replace',
              path: '/patient/reference',
              value: params.functionParams.relatedPersonParams[dataKey],
            });
            break;
          case 'email':
            patchArr.push({
              op: 'replace',
              path: '/telecom/0',
              value: {
                system: 'email',
                value: params.functionParams.relatedPersonParams[dataKey],
              },
            });
            break;
          case 'mobilePhone':
            patchArr.push({
              op: 'replace',
              path: '/telecom/0',
              value: {
                system: 'phone',
                value: params.functionParams.relatedPersonParams[dataKey],
                use: 'mobile',
              },
            });
            break;
          case 'homePhone':
            patchArr.push({
              op: 'replace',
              path: '/telecom/0',
              value: {
                system: 'phone',
                value: params.functionParams.relatedPersonParams[dataKey],
                use: 'home',
              },
            });
            break;
          case 'relationship':
            patchArr.push({
              op: 'replace',
              path: '/relationship/0/coding/0/code',
              value: params.functionParams.relatedPersonParams[dataKey],
            });
            break;
          case 'identifierType':
            patchArr.push({
              op: 'replace',
              path: '/identifier/0/type/coding/0/code',
              value: params.functionParams.relatedPersonParams[dataKey],
            });
            break;
          case 'identifier':
            patchArr.push({
              op: 'replace',
              path: '/identifier/0/value',
              value: params.functionParams.relatedPersonParams[dataKey],
            });
            break;
          case 'gender':
            patchArr.push({
              op: 'replace',
              path: '/gender',
              value: params.functionParams.relatedPersonParams[dataKey],
            });
            break;
          default:
            break;
        }
      }
    }
    return CRUDOperations(
      'patch',
      `${params.url}/${params.functionParams.relatedPersonId}`,
      patchArr,
    );
  },
};

export default function RelatedPerson(action = null, params = null) {
  if (action) {
    const transformer =
      RelatedPersonStats[action] ?? RelatedPersonStats.__default__;
    return transformer(params);
  }
}
