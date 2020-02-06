import {
    SET_STATUS_FILTER_BOX_VALUE,
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_FAILED,
    GET_APPOINTMENTS_SUCCESS
} from "./PatientTrackingTypes";
import {getAppointments} from "../../../Utils/Services/FhirAPI";
import {normalizeAppointmentData} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentData";


export const setStatusFilterBoxValueAction = value => {
    return {
        type: SET_STATUS_FILTER_BOX_VALUE,
        value
    }
};

export const getAppointmentsStartAction = () => {
    return {
        type: GET_APPOINTMENTS
    };
};

export const getAppointmentsFailedAction = () => {
    return {
        type: GET_APPOINTMENTS_FAILED
    };
};


export const getAppointmentsSuccessAction = payload => {
    return {
        type: GET_APPOINTMENTS_SUCCESS,
        payload
    };
};


export const getAppointmentsAction = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getAppointmentsStartAction());
            const {data} = await getAppointments();
            const normalizedAppointmentData = normalizeAppointmentData(data.entry);
            dispatch(getAppointmentsSuccessAction(normalizedAppointmentData))
        } catch (err) {
            dispatch(getAppointmentsFailedAction());
        }
    };
};
