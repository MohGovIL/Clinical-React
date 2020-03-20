import {
    SET_APPOINTMENTS_WITH_PATIENTS,
    SET_APPOINTMENTS_WITH_PATIENTS_FAILED,
    SET_APPOINTMENTS_WITH_PATIENTS_SUCCESS,
    SET_ENCOUNTER_WITH_PATIENTS_SUCCESS,
    SET_ENCOUNTER_WITH_PATIENTS_FAILED,
    SET_ENCOUNTER_WITH_PATIENTS,
    SET_PATIENT_DATA, SET_PATIENT_DATA_SUCCESS
} from "../Actions/FhirActions/fhirActionTypes";

const INITIAL_STATE = {
    STATUS: '',
    appointments: null,
    patients: null,
    encounters: null
};


const FhirDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ENCOUNTER_WITH_PATIENTS:
            return {
              ...state,
              STATUS: action.type
            };
        case SET_ENCOUNTER_WITH_PATIENTS_FAILED:
            return {
              ...state,
              STATUS: action.type
            };
        case SET_ENCOUNTER_WITH_PATIENTS_SUCCESS:
            return {
                ...state,
                STATUS: action.type,
                encounters: action.encounters,
                patients: action.patients
            };
        case SET_APPOINTMENTS_WITH_PATIENTS:
            return {
                ...state,
                STATUS: action.type,
            };
        case SET_APPOINTMENTS_WITH_PATIENTS_FAILED:
            return {
                ...state,
                STATUS: action.type,
            };
        case SET_APPOINTMENTS_WITH_PATIENTS_SUCCESS:
            return {
                ...state,
                STATUS: action.type,
                appointments: action.appointments,
                patients: action.patients
            };
        case SET_PATIENT_DATA_SUCCESS:
            return {
                ...state,
                STATUS: action.type,
                patients: action.patient
            };
        default:
            return state;
    }
};

export default FhirDataReducer;
