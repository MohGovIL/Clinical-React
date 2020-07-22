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
    CRUDOperations('create', `${params.url}`, denormalizedMedicationRequest);
  },
  updateMedicationRequest: (params) => {},
};

export default function MedicationRequest(action = null, params = null) {
  if (action) {
    const transformer =
      MedicationRequestState[action] ?? MedicationRequestState.__default__;
    return transformer(params);
  }
}
