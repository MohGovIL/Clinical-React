/**
 * @author Yuriy Gershem - yuriyge@matrix.co.il
 * @fileOverview  - this is a Condition strategy
 */

import { CRUDOperations } from '../CRUDOperations';
import denormalizeFhirCondition from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirCondition';
import { fhirFormatDateTime }  from 'Utils/Helpers/Datetime/formatDate';


const ConditionStates = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/Condition';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return ConditionStates[parameters.functionName](paramsToCRUD);
  },
  patchCondition: (params) => {
    const { url, conditionId, patchParams } = params;
    if (Object.keys(patchParams).length) {
      const patchArr = [];
      for (const patchKey in patchParams) {
        if (patchParams.hasOwnProperty(patchKey)) {
          const element = patchParams[patchKey];
          switch (patchKey) {
            case 'clinicalStatus':
              patchArr.push({
                op: 'replace',
                path: '/clinicalStatus/coding/0/code',
                value: element,
              });
              break;
            default:
              break;
          }
        }
      }
      return CRUDOperations('patch', `${url}/${conditionId}`, patchArr);
    }
  },
  getConditionListByParams: (params) => {
    if (params.subject > 0 && params.category.length > 0) {
      return CRUDOperations(
        'search',
        `${params.url}?subject=${
          params.subject
        }&category=clinikal/condition/category/${params.category}${
          params.status ? `&clinical-status=${params.status}` : ''
        }${params.encounter ? `&encounter=${params.encounter}` : ''}`,
      );
    } else {
      return false;
    }
  },
  createCondition: (params) => {
    if (params.condition) {
      params.condition.recordedDate = fhirFormatDateTime();
      const denormalizedFhirCondition = denormalizeFhirCondition(
        params.condition,
      );
      return CRUDOperations(
        'create',
        `${params.url}`,
        denormalizedFhirCondition,
      );
    } else {
      throw new Error('condition is empty');
    }
  },
  deleteCondition: (params) => {
    return CRUDOperations('delete', `${params.url}/${params.conditionId}`);
  },
};

export default function Condition(action = null, params = null) {
  if (action) {
    const transformer = ConditionStates[action] ?? ConditionStates.__default__;
    return transformer(params);
  }
}
