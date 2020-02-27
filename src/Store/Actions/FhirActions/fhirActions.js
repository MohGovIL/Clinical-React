import {
    SET_APPOINTMENTS_WITH_PATIENTS_SUCCESS,
    SET_APPOINTMENTS_WITH_PATIENTS_FAILED,
    SET_APPOINTMENTS_WITH_PATIENTS,
    SET_ENCOUNTER_WITH_PATIENTS,
    SET_ENCOUNTER_WITH_PATIENTS_FAILED,
    SET_ENCOUNTER_WITH_PATIENTS_SUCCESS
} from "./fhirActionTypes";
//TODO use this functions to add the data to redux
export const setEncounterWithPatientsAction = (patients, encounters) => {
    return dispatch => {
        try{
            dispatch(setEncounterWithPatientsStartAction());
            dispatch(setEncounterWithPatientsSuccessAction(patients, encounters));
        }catch(err){
            dispatch(setEncounterWithPatientsFailedAction());
        }
    }

};

const setEncounterWithPatientsStartAction = () => {
    return {
        type: SET_ENCOUNTER_WITH_PATIENTS
    }
};

const setEncounterWithPatientsFailedAction = () => {
  return {
      type: SET_ENCOUNTER_WITH_PATIENTS_FAILED
  }
};


const setEncounterWithPatientsSuccessAction = (patients, encounters) => {
    return {
        type: SET_ENCOUNTER_WITH_PATIENTS_SUCCESS,
        encounters,
        patients
    }
};

const setAppointmentsWithPatientsStartAction = () => {
    return {
        type: SET_APPOINTMENTS_WITH_PATIENTS
    }
};

const setAppointmentsWithPatientsFailedAction = () => {
  return {
      type: SET_APPOINTMENTS_WITH_PATIENTS_FAILED
  }
};

const setAppointmentsWithPatientsSuccessAction = (patients, appointments) => {
    return {
        type: SET_APPOINTMENTS_WITH_PATIENTS_SUCCESS,
        patients,
        appointments
    }
};


export const setAppointmentsWithPatientsAction = (patients, appointments) => {
    return dispatch => {
        try {
            dispatch(setAppointmentsWithPatientsStartAction());
            dispatch(setAppointmentsWithPatientsSuccessAction(patients, appointments));
        } catch (err) {
            dispatch(setAppointmentsWithPatientsFailedAction());
        }
    }
};
