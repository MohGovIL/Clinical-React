import normalizeFhirEncounter from './FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import { store } from '../../index';
import { setEncounterAndPatient } from '../../Store/Actions/ActiveActions';
import { baseRoutePath } from './baseRoutePath';

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
    pathname: `${baseRoutePath()}/imaging/patientAdmission`,
  });
};
