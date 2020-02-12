import {GET_SETTINGS, GET_SETTINGS_SUCCESS, GET_SETTINGS_FAILED, SET_FILTER_DATE} from "../Actions/SettingsActions/SettingsActionTypes";
import Moment from 'moment';

const INITIAL_STATE = {
    STATUS: null,
    facility: null,
    lang_id: null,
    lang_dir: null,
    lang_code: null,
    format_date: null,
    user_role: null,
    clinikal_vertical: null,
    filter_date: Moment.now(),
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
        case SET_FILTER_DATE:
            return {
                ...state,
                STATUS: action.type,
                filter_date: action.filter_date
            };
        default:
            return state;
    }
};

export default SettingsReducer;
