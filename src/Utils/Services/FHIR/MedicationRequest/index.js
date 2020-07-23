/**
 * @author Idan Gigi idangi@matrix.co.il
 */

import { CRUDOperations } from '../CRUDOperations';
import { denormalizeFhirMedicationRequest } from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirMedicationRequest';

const MedicationRequestState = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/MedicationRequest';
    let paramsToCRUD = parameters.functionParams;
    paramsToCRUD.url = componentFhirURL;
    return MedicationRequestState[parameters.functionName](paramsToCRUD);
  },
  createMedicationRequest: (params) => {
    const denormalizedMedicationRequest = denormalizeFhirMedicationRequest(
      params.medicationRequest,
    );
    return CRUDOperations(
      'create',
      `${params.url}`,
      denormalizedMedicationRequest,
    );
  },
  updateMedicationRequest: (params) => {},
  getMedicationRequest: (params) => {
    /**
     *  _id - If _id is supplied all other params will be ignored
     *  encounterId
     *  patientId
     *  recorder
     *  requester
     *  code
     */

    // Side note in doWork I don't thin that you should take functionParams and insert them inside the object
    // because then if you want to loop over only functionParams you can't you'll loop on the url as well for no reason
    // Should be refactored in every other FHIR element
    const availableSearchParams = {
      encounterId: true,
      patientId: true,
      recorder: true,
      requester: true,
      code: true,
    };
    if (params._id) {
      params.url += `/${params._id}`;
    } else {
      /**
       * item inside searchParamsProvided: {searchParamName: "<NAME>", searchParamValue: "<VALUE>"}
       */
      const searchParamsProvided = [];
      for (const paramsKey in params) {
        if (params.hasOwnProperty(paramsKey)) {
          const element = params[paramsKey];
          if (availableSearchParams[paramsKey])
            searchParamsProvided.push({
              searchParamName: paramsKey,
              searchParamValue: element,
            });
        }
      }
      if (searchParamsProvided.length) {
        searchParamsProvided.forEach((param, paramIndex) => {
          params.url += `${paramIndex === 0 ? '?' : '&'}${
            param.searchParamName
          }=${param.searchParamValue}`;
        });
      }
    }
    return CRUDOperations('read', `${params.url}`);
  },
};

export default function MedicationRequest(action = null, params = null) {
  if (action) {
    const transformer =
      MedicationRequestState[action] ?? MedicationRequestState.__default__;
    return transformer(params);
  }
}
