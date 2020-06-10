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
  getConditionSensitivesList: (params) => {
    return CRUDOperations('search', `${params.url}?paitent=1&&category=http://clinikal/condition/category/allergy&clinical-status=active`);
  },
  getConditionMedicalProblemList: (params) => {
    return CRUDOperations('search', `${params.url}?paitent=1&&category=http://clinikal/condition/category/medical_problem&clinical-status=active`);
  }
}

export default function Condition(action = null, params = null) {
  if (action) {
    const transformer =
      ConditionStates[action] ?? ConditionStates.__default__;
    return transformer(params);
  }
}
