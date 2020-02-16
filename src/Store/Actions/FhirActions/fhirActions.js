import {
    SET_APPOINTMENTS_WITH_PATIENTS_SUCCESS,
    SET_APPOINTMENTS_WITH_PATIENTS_FAILED,
    SET_APPOINTMENTS_WITH_PATIENTS
} from "./fhirActionTypes";
import {normalizeFhirAppointmentsWithPatients} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentsWithPatients";
import {getAppointmentsWithPatients} from "../../../Utils/Services/FhirAPI";

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
            // dispatch(getAppointmentsWithPatientsStartAction());
            dispatch(setAppointmentsWithPatientsSuccessAction(patients, appointments));
        } catch (err) {
            // dispatch(getAppointmentsWithPatientsFailedAction());
        }
    }
};
