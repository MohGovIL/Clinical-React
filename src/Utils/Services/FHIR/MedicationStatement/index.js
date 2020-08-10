/**
 * @author Yuriy Gershem - yuriyge@matrix.co.il
 * @fileOverview  - this is a MedicationStatement strategy
 */

import { CRUDOperations } from '../CRUDOperations';
import denormalizeFhirMedicationStatement from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirMedicationStatement';

const MedicationStatementState = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/MedicationStatement';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return MedicationStatementState[parameters.functionName](paramsToCRUD);
  },

  getMedicationStatementListByParams: (params) => {
    if (
      params.patient > 0 &&
      params.category.length > 0 &&
      params.status.length > 0
    ) {
      return CRUDOperations(
        'search',
        `${params.url}?patient=${params.patient}&category=clinikal/medicationStatement/category/${params.category}&status=${params.status}`,
      );
    } else {
      return false;
    }
  },
  createMedicationStatement: (params) => {
    if (!params.medicationStatement)
      throw new Error('Empty medicationStatement');
    const denormalizedFhirMedicationStatement = denormalizeFhirMedicationStatement(
      params.medicationStatement,
    );

    return CRUDOperations(
      'create',
      `${params.url}`,
      denormalizedFhirMedicationStatement,
    );
  },
};

export default function MedicationStatement(action = null, params = null) {
  if (action) {
    const transformer =
      MedicationStatementState[action] ?? MedicationStatementState.__default__;
    return transformer(params);
  }
}
