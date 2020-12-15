import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const ToastText = ({ message, icon }) => {

  const iconStyle = {
    position: 'relative',
    top: '5px'
  };

  const msgStyle = {
    fontSize: '18px'
  }

  const iconComponent = (icon) => {
    switch(icon) {
      case 'check':
        return <CheckCircleOutlineIcon />;
      case 'error':
        return <ErrorOutlineOutlinedIcon />
      default:
        return <CheckCircleOutlineIcon />;
    }
  }

  return(
    <React.Fragment><i style={iconStyle}>{iconComponent(icon)}</i> <span style={msgStyle}>{message}</span></React.Fragment>
  )

}

export default ToastText;
