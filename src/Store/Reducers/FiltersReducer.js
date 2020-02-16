import {
 SET_STATUS_FILTER_BOX_VALUE
} from "../Actions/PatientTrackingActions/PatientTrackingTypes";

const INITIAL_STATE = {
    STATUS: '',
    statusFilterBoxValue: 0,
};

const FiltersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_STATUS_FILTER_BOX_VALUE:
            return {
                ...state,
                STATUS: action.type,
                statusFilterBoxValue: action.value
            };
        default:
            return state;
    }
};

export default FiltersReducer;
