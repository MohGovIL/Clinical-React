import { goTo } from 'Utils/Helpers/goTo';

/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {normalizedEncounter} encounter
 * @param {normalizedPatient} patient
 * @param {History} history
 */
export const goToEncounterSheet = (encounter, patient, history) => {
  const encounterSheetPath = '/generic/EncounterSheet';
  goTo(encounter, patient, history, encounterSheetPath);
};
