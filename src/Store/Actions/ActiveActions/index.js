import {
  SET_ACTIVE_PATIENT,
  SET_ACTIVE_ENCOUNTER,
  SET_ACTIVE_ENCOUNTER_AND_PATIENT,
  SET_ACTIVE_USER,
} from './ActiveActionsTypes';

export const setPatientAction = (patient) => {
  return {
    type: SET_ACTIVE_PATIENT,
    patient,
  };
};

export const setEncounterAction = (encounter) => {
  return {
    type: SET_ACTIVE_ENCOUNTER,
    encounter,
  };
};

export const setEncounterAndPatient = (encounter, patient) => {
  return {
    type: SET_ACTIVE_ENCOUNTER_AND_PATIENT,
    patient,
    encounter,
  };
};

export const setUserAction = (user) => {
  return {
    type: SET_ACTIVE_USER,
    user,
  };
};
