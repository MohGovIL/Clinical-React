import {GET_SETTINGS, GET_SETTINGS_SUCCESS, GET_SETTINGS_FAILED} from "../Actions/SettingsActions/SettingsActionTypes";

const INITIAL_STATE = {
    STATUS: null,
    facility: null,
    lang_id: null,
    lang_dir: null,
    lang_code: null,
    format_date: null,
    user_role: null,
    user_aco: null,
    clinikal_vertical: null
};

const SettingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            return {
                ...state,
                STATUS: action.type
            };
        case GET_SETTINGS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                STATUS: action.type,
            };
        case GET_SETTINGS_FAILED:
            return {
                ...state,
                STATUS: action.type
            };
        default:
            return state;
    }
};

export default SettingsReducer;
