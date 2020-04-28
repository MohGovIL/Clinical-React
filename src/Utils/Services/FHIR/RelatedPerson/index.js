/**
 * @author Idan Gigi - gigiidan@gmail.com
 */

import { CRUDOperations } from '../CRUDOperations/index';

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
    const relatedPerson = {};
    return CRUDOperations('post', `${params.url}`, relatedPerson);
  },
  updateRelatedPerson: (params) => {
    const patchArr = [];
    for (const dataKey in params.functionParams.relatedPersonPatchParams) {
      if (
        params.functionParams.relatedPersonPatchParams.hasOwnProperty(dataKey)
      ) {
        switch (dataKey) {
          case 'active':
            patchArr.push({
              op: 'replace',
              path: '/active',
              value: params.functionParams.relatedPersonPatchParams[dataKey],
            });
            break;
          case 'patient':
            patchArr.push({
              op: 'replace',
              path: '/patient/reference',
              value: params.functionParams.relatedPersonPatchParams[dataKey],
            });
            break;
          case 'email':
            patchArr.push({
              op: 'replace',
              path: '/telecom/0',
              value: {
                system: 'email',
                value: params.functionParams.relatedPersonPatchParams[dataKey],
              },
            });
            break;
          case 'mobilePhone':
            patchArr.push({
              op: 'replace',
              path: '/telecom/0',
              value: {
                system: 'phone',
                value: params.functionParams.relatedPersonPatchParams[dataKey],
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
                value: params.functionParams.relatedPersonPatchParams[dataKey],
                use: 'home',
              },
            });
            break;
          case 'relationship':
            patchArr.push({
              op: 'replace',
              path: '/relationship/0/coding/0/code',
              value: params.functionParams.relatedPersonPatchParams[dataKey],
            });
            break;
          case 'identifierType':
            patchArr.push({
              op: 'replace',
              path: '/identifier/0/type/coding/0/code',
              value: params.functionParams.relatedPersonPatchParams[dataKey],
            });
            break;
          case 'identifier':
            patchArr.push({
              op: 'replace',
              path: '/identifier/0/value',
              value: params.functionParams.relatedPersonPatchParams[dataKey],
            });
            break;
          case 'gender':
            patchArr.push({
              op: 'replace',
              path: '/gender',
              value: params.functionParams.relatedPersonPatchParams[dataKey],
            });
            break;
          default:
            break;
        }
      }
    }
    return CRUDOperations(
      'patch',
      `${params.url}/${params.relatedPersonId}`,
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
