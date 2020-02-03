import {
    SET_STATUS_FILTER_BOX_INDEX
} from "../Actions/PatientTrackingActions/PatientTrackingTypes";

const INITIAL_STATE = {
    statusFilterBoxIndex: 0,

};


const PatientTrackingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_STATUS_FILTER_BOX_INDEX:
            return {
                ...state,
                statusFilterBoxIndex: action.index,
            };

        default:
            return state;
    }
};

export default PatientTrackingReducer;
