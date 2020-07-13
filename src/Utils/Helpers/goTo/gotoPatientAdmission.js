/**
 * @author - Dror Golan drorgo@matrix.co.il -
 * @changes by - Idan Gigi idangi@matrix.co.il (imoort and routing)
 * @param {normalizedEncounter} encounter
 * @param {normalizedPatient} patient
 * @param {History} history
 */
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import { store } from 'index';
import { setEncounterAndPatient } from 'Store/Actions/ActiveActions';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';

export const gotToPatientAdmission = (encounter, patient, history) => {
  let encounterData =
    encounter && encounter.data
      ? normalizeFhirEncounter(encounter.data)
      : encounter;

  if (!encounterData) {
    console.log('error no encounter was used in the request found');
    return;
  }

  store.dispatch(setEncounterAndPatient(encounterData, patient));
  history.push({
    pathname: `${baseRoutePath()}/generic/patientAdmission`,
  });
};
