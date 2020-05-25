/**
 * @author Dror Golan - drorgo@matrix.co.il
 */

import { CRUDOperations } from '../CRUDOperations';

const PractitionerStates = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/Practitioner';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return PractitionerStates[parameters.functionName](paramsToCRUD);
  },
  getPractitioner: (params = null) => {
    /* example:
           GET /apis/fhir/v4/Practitioner/:id
     */

    let id = params.user,
      url = params.url;

    return CRUDOperations('read', `${url}/${id}`);
  },
  searchForPractitioner: (params = null) => {
    /* example:
            GET /apis/fhir/v4/Practitioner?name=yosi&active=1
      */

    let id = params.id,
      given = params.given ? params.given : '',
      family = params.family ? params.family : '',
      active = params.active ? params.active : 1,
      url = params.url;

    return CRUDOperations(
      'search',
      `${url}?name=${given} ${family}&active=${active}`,
    );
  },
};

export default function Practitioner(action = null, params = null) {
  if (action) {
    const transformer =
      PractitionerStates[action] ?? PractitionerStates.__default__;
    return transformer(params);
  }
}
