import { SNACKBAR_SUCCESS, SNACKBAR_CLEAR } from './UiActionsTypes';

export const showSnackbar = (message, icon) => {
  return dispatch => {
    dispatch({ type: SNACKBAR_SUCCESS, message, icon });
  };
};

export const clearSnackbar = () => {
  return dispatch => {
    dispatch({ type: SNACKBAR_CLEAR });
  };
};