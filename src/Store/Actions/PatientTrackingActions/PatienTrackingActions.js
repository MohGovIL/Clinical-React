import {
    SET_STATUS_FILTER_BOX_INDEX
} from "./PatientTrackingTypes";

export const setStatusFilterBoxIndexAction = index => {
    return {
        type: SET_STATUS_FILTER_BOX_INDEX,
        index
    }
};
