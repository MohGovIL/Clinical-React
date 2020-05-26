import { store } from 'index';
import { setEncounterAndPatient } from 'Store/Actions/ActiveActions';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';

/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {normalizedEncounter} encounter
 * @param {normalizedPatient} patient
 * @param {History} history
 * @param {string} path
 */
export const goTo = (encounter, patient, history, path) => {
  store.dispatch(setEncounterAndPatient(encounter, patient));
  history.push({
    pathname: `${baseRoutePath()}${path}`,
  });
};
