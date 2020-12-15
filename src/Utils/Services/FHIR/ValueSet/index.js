/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a valueset strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - idangi@matrix.co.il
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import { CRUDOperations } from '../CRUDOperations';

const ValueSetStates = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/ValueSet';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return ValueSetStates[parameters.functionName](paramsToCRUD);
  },

  getValueSet: (params) => {
    const valueSet = CRUDOperations(
      'read',
      `${params.url}/${params.id}/$expand`,
    );
    return valueSet;
  },
  requestValueSet: async (params) => {
    const valueSet = await ValueSetStates['getValueSet'](params);

    if (valueSet && valueSet.data && valueSet.data.expansion) {
      const {
        data: {
          expansion: { contains },
        },
      } = await ValueSetStates['getValueSet'](params);
      let options = [];
      if (contains) {
        for (let status of contains) {
          options[status.code] = status.display;
        }
      }

      return options;
    }
    return [];
  },
};

export default function ValueSet(action = null, params = null) {
  if (action) {
    const transformer = ValueSetStates[action] ?? ValueSetStates.__default__;
    return transformer(params);
  }
}
