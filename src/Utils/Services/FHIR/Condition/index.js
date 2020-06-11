/**
 * @author Yuriy Gershem - yuriyge@matrix.co.il
 * @fileOverview  - this is a Condition strategy
 */

import { CRUDOperations } from '../CRUDOperations';

const ConditionStates = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/Condition';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return ConditionStates[parameters.functionName](paramsToCRUD);
  },

  getConditionListByParams: (params) => {
    if (
      params.subject > 0 &&
      params.category.length > 0 &&
      params.status.length > 0
    ) {
      return CRUDOperations(
        'search',
        `${params.url}?subject=${params.subject}&category=clinikal/condition/category/${params.category}&clinical-status=${params.status}`,
      );
    } else {
      return false;
    }
  },
};

export default function Condition(action = null, params = null) {
  if (action) {
    const transformer = ConditionStates[action] ?? ConditionStates.__default__;
    return transformer(params);
  }
}
