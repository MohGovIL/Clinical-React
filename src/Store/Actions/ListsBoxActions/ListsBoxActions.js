import { SET_VALUESET } from './ListsboxActionTypes';

export const setValueset = () => {
  return async (dispatch, valueset) => {
    try {
      let objValueset = {};
      objValueset[valueset.id] = valueset;
      dispatch({ type: SET_VALUESET, valueset });
    } catch (err) {
      console.log(err);
    }
  };
};
