import { SNACKBAR_SUCCESS, SNACKBAR_CLEAR } from 'Store/Actions/UiActions/UiActionsTypes';

const UiReducer = (state = {}, action) => {
  switch (action.type) {
    case SNACKBAR_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message,
        snackbarIcon: action.icon
      };
    case SNACKBAR_CLEAR:
      return {
        ...state,
        snackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false
      };
    default:
      return state;
  }
};

export default UiReducer;