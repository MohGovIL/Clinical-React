import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import ToastText from "./ToastText";

const StyledToastMessage = styled(Snackbar)`
  .MuiSnackbarContent-action {
      margin-left: ${(props) => (props.direction === 'rtl' ? '-8px' : 'auto')};
      margin-right: ${(props) => (props.direction === 'rtl' ? 'auto' : '-8px')};  
  }
`
export default StyledToastMessage;