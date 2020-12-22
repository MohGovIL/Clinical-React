import { SET_VALUESET } from 'Store/Actions/ListsBoxActions/ListsboxActionTypes';

const INITIAL_STATE = {
  listsbox:{}
};

const facilityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_VALUESET:
      let mergedListbox = {...state.listsbox, ...action.valueset}
      return {
        ...state,
        listsbox:  mergedListbox
      };
    default:
      return state;
  }
};

export default facilityReducer;
