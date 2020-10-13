import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ToastText from'./ToastText';
import StyledToastMessage from './style'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { clearSnackbar } from "Store/Actions/UiActions/ToastActions.js";

const ToastMessage = ({language_direction}) => {

  const dispatch = useDispatch();

  const { snackbarMessage, snackbarIcon, snackbarOpen } = useSelector(
    state => state.ui
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <StyledToastMessage
      direction={language_direction}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message={<ToastText message={snackbarMessage} icon={snackbarIcon}/>}
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default ToastMessage;
