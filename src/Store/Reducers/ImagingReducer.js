import {
    SET_STATUS_FILTER_BOX_VALUE,
    GET_PATIENTS_DATA,
    GET_PATIENTS_DATA_FAILED,
    GET_PATIENTS_DATA_SUCCESS

} from "../Actions/PatientTrackingActions/PatientTrackingTypes";

const INITIAL_STATE = {
    STATUS: '',
    statusFilterBoxValue: 0,
    patientsData: []
};


const ImagingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_STATUS_FILTER_BOX_VALUE:
            return {
                ...state,
                statusFilterBoxValue: action.value,
                STATUS: action.type
            };
        case GET_PATIENTS_DATA:
            return {
                ...state,
                STATUS: action.type
            };
        case GET_PATIENTS_DATA_SUCCESS:
            return {
                ...state,
                STATUS: action.type,
                patientsData: [...action.payload]
            };
        case GET_PATIENTS_DATA_FAILED:
            return {
                ...state,
                STATUS: action.type,
            };
        default:
            return state;
    }
};

export default ImagingReducer;
