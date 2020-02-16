import {
    GET_APPOINTMENTS_WITH_PATIENTS_SUCCESS,
    GET_APPOINTMENTS_WITH_PATIENTS_FAILED,
    GET_APPOINTMENTS_WITH_PATIENTS
} from "./fhirActionTypes";
import {normalizeFhirAppointmentsWithPatients} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentsWithPatients";
import {getAppointmentsWithPatients} from "../../../Utils/Services/FhirAPI";

const getAppointmentsWithPatientsStartAction = () => {
    return {
        type: GET_APPOINTMENTS_WITH_PATIENTS
    }
};

const getAppointmentsWithPatientsFailedAction = () => {
  return {
      type: GET_APPOINTMENTS_WITH_PATIENTS_FAILED
  }
};

const getAppointmentsWithPatientsSuccessAction = (patients, appointments) => {
    return {
        type: GET_APPOINTMENTS_WITH_PATIENTS_SUCCESS,
        patients,
        appointments
    }
};


export const setAppointmentsWithPatientsAction = (patients, appointments) => {
    return dispatch => {
        try {
            // dispatch(getAppointmentsWithPatientsStartAction());
            dispatch(getAppointmentsWithPatientsSuccessAction(patients, appointments));
        } catch (err) {
            // dispatch(getAppointmentsWithPatientsFailedAction());
        }
    }
};
