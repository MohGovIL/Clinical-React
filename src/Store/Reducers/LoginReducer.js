import {LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS} from '../Actions/LoginActions/LoginActionTypes'

const INITIAL_STATE = {
    isAuth: false,
    STATUS: ""
};

const loginReducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    STATUS: action.type,
                    isAuth: action.isAuth
                };

            case
            LOGIN_START:
                return {
                    ...state,
                    STATUS: action.type
                };
            case
            LOGIN_FAILED:
                return {
                    ...state,
                    isAuth: action.isAuth,
                    STATUS: action.type
                };

            default:
                return state;
        }
    }
;

export default loginReducer;