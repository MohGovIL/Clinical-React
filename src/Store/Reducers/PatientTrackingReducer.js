import {
    SET_STATUS_FILTER_BOX_VALUE
} from "../Actions/PatientTrackingActions/PatientTrackingTypes";

const INITIAL_STATE = {
    statusFilterBoxValue: 0,

};


const PatientTrackingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_STATUS_FILTER_BOX_VALUE:
            return {
                ...state,
                statusFilterBoxValue: action.value,
            };

        default:
            return state;
    }
};

export default PatientTrackingReducer;
