import {GET_FACILITY} from 'Store/Actions/FacilityActions/FacilityActionTypes';

const INITIAL_STATE = {
    name: "",
    phone: "",
    fax: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    email: "",
    service_location: "",
    billing_location: "",
    color: ""
};

const facilityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FACILITY:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default facilityReducer;
