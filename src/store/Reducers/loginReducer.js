import {LOGIN} from '../Actions/actionTypes'

const INITIAL_STATE = {
    isAuth: false
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            if (action.isAuth) {
                return {...state, isAuth: action.isAuth}
            } else {
                return {...state, isAuth: action.isAuth}
            }

        default:
            return state;
    }
};

export default loginReducer;