/**
 * @author Yuriy Gershem - yuriyge@matrix.co.il
 * @fileOverview  - this is a MedicationStatement strategy
 */

import { CRUDOperations } from '../CRUDOperations';
import denormalizeFhirMedicationStatement from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirMedicationStatement';
import { fhirFormatDateTime }  from 'Utils/Helpers/Datetime/formatDate';


const MedicationStatementState = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/MedicationStatement';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return MedicationStatementState[parameters.functionName](paramsToCRUD);
  },
  patchMedicationStatement: (params) => {
    const { url, medicationStatementId, patchParams } = params;
    if (Object.keys(patchParams).length && medicationStatementId) {
      const patchArr = [];
      for (const patchKey in patchParams) {
        if (patchParams.hasOwnProperty(patchKey)) {
          const element = patchParams[patchKey];
          switch (patchKey) {
            case 'status':
              patchArr.push({
                op: 'replace',
                path: '/status',
                value: element,
              });
              break;
            case 'encounter':
              patchArr.push({
                op: 'replace',
                path: '/context/reference',
                value: `Encounter/${element}`,
              });
              break;
            default:
              break;
          }
        }
      }
      CRUDOperations('patch', `${url}/${medicationStatementId}`, patchArr);
    }
  },
  getMedicationStatementListByParams: (params) => {
    if (params.patient) {
      return CRUDOperations(
        'search',
        `${params.url}?patient=${params.patient}${
          params.category
            ? `&category=clinikal/medicationStatement/category/${params.category}`
            : ''
        }${params.status ? `&status=${params.status}` : ''}`,
      );
    } else {
      return false;
    }
  },
  createMedicationStatement: (params) => {
    if (!params.medicationStatement)
      throw new Error('Empty medicationStatement');
    params.medicationStatement.dateAsserted = fhirFormatDateTime();
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
