import styled from 'styled-components';
import { KeyboardDatePicker } from '@material-ui/pickers';

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  width: 70%;
  background-color: #f8faff;
  border-radius: 10px;
  margin: 24px 0 24px 0;
  transform-origin: ${(props) =>
    props.direction === 'rtl' ? 'top right' : 'top left'};
  .MuiInputLabel-formControl {
    right: ${(props) => (props.direction === 'rtl' ? '0' : 'unset')};
    left: ${(props) => (props.direction === 'rtl' ? 'unset' : '0')};
  }

  .MuiInputLabel-shrink {
    transform-origin: ${(props) =>
      props.direction === 'rtl' ? 'top right' : 'top left'};
    opacity: 0.6;
    color: #1e2132;
  }
  .MuiSvgIcon-root {
    color: #076ce9;
  }
  .MuiInputBase-root {
    color: #000b40;
  }
  .MuiFormHelperText-root {
    text-align: ${(props) => (props.direction === 'rtl' ? 'right' : 'left')};
  }
`;

export default StyledKeyboardDatePicker;
