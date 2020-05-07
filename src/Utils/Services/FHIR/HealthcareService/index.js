/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a encounter strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - gigiidan@gmail.com
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 * @remark - NOT YET TESTED....
 */

import { normalizeHealthCareServiceValueData } from '../../../Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData';
import { CRUDOperations } from '../CRUDOperations';

const HealthcareServiceStates = {
  doWork: (parameters) => {
    let componentFhirURL = '/HealthcareService';
    parameters.url = componentFhirURL;
    return HealthcareServiceStates[parameters.functionName](parameters);
  },
  getHealhcareService: (params) => {
    // return fhirTokenInstance().get(`${fhirBasePath}/?organization=${organization}`);
    const organizationId = params.organizationId;
    return CRUDOperations(
      'search',
      `${params.url}?organization=${organizationId}`,
    );
  },
  getHealthCareServiceByOrganization: async (parameters) => {
    let array = [];
    const {
      data: { entry: dataServiceType },
    } = await HealthcareServiceStates['getHealhcareService'](parameters);
    if (dataServiceType) {
      for (let entry of dataServiceType) {
        if (entry.resource !== undefined) {
          const setLabelServiceType = normalizeHealthCareServiceValueData(
            entry.resource,
          );
          array[setLabelServiceType.code] = setLabelServiceType.name;
        }
      }
    }

    return array;
  },
};

export default function HealthcareService(action = null, params = null) {
  if (action) {
    const transformer =
      HealthcareServiceStates[action] ?? HealthcareServiceStates.__default__;
    return transformer(params);
  }
}
