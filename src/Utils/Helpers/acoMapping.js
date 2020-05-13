/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param getUIACOMapping - array
 * @returns getUIACOMapping - aco mapping
 */

const getUIACOMapping = {
  invited: 'PatientTrackingInvited',
  waiting_for_examination: 'PatientTrackingWaitingForExamination',
  waiting_for_decoding: 'PatientTrackingWaitingForDecoding',
  finished: 'PatientTrackingFinished',
  add_patient: 'AddPatient',
  appointment_details: 'AppointmentDetails',
  calendar: 'Calendar',
  encounter_sheet: 'EncounterSheet',
  patient_admission: 'PatientAdmission',
  search_patient: 'SearchPatient',
  appointments_and_encounters: 'AppointmentsAndEncounters',
};

export default getUIACOMapping;
