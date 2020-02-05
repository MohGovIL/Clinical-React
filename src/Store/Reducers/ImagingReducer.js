import {
    SET_STATUS_FILTER_BOX_VALUE,
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_SUCCESS,
    GET_APPOINTMENTS_FAILED
} from "../Actions/PatientTrackingActions/PatientTrackingTypes";

const INITIAL_STATE = {
    STATUS: '',
    statusFilterBoxValue: 0,
    appointments: []
};


const ImagingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_STATUS_FILTER_BOX_VALUE:
            return {
                ...state,
                statusFilterBoxValue: action.value,
                STATUS: action.type
            };
        case GET_APPOINTMENTS:
            return {
              ...state,
              STATUS: action.type
            };
        case GET_APPOINTMENTS_SUCCESS:
            return {
              ...state,
              STATUS: action.type,
              appointments: [...action.payload]
            };
        case GET_APPOINTMENTS_FAILED:
            return {
              ...state,
              STATUS: action.type,
            };
        default:
            return state;
    }
};

export default ImagingReducer;
