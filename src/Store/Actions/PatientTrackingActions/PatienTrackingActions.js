import {
    SET_STATUS_FILTER_BOX_VALUE,
    GET_PATIENTS_DATA_SUCCESS,
    GET_PATIENTS_DATA_FAILED,
    GET_PATIENTS_DATA
} from "./PatientTrackingTypes";
import {getAppointmentsWithPatients} from "../../../Utils/Services/FhirAPI";
import {normalizeFhirAppointmentsWithPatients} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentsWithPatients";


export const setStatusFilterBoxValueAction = value => {
    return {
        type: SET_STATUS_FILTER_BOX_VALUE,
        value
    }
};

export const setPatientsDataStartAction = () => {
    return {
        type: GET_PATIENTS_DATA
    };
};

export const setPatientsDataFailedAction = () => {
    return {
        type: GET_PATIENTS_DATA_FAILED
    };
};


export const setPatientsDataSuccessAction = payload => {
    return {
        type: GET_PATIENTS_DATA_SUCCESS,
        payload
    };
};


export const setPatientsDataAction = (patientsData) => {
    return async dispatch => {
        // try {
            // dispatch(setPatientsDataStartAction());
            // const {data} = await getAppointments();
            // const normalizedAppointmentData = normalizeAppointmentData(data.entry);
            dispatch(setPatientsDataSuccessAction(patientsData));
        // } catch (err) {
        //     dispatch(setPatientsDataFailedAction());
        // }
    };
};
