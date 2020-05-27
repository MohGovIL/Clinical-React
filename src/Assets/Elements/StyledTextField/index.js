import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  width: ${(props) => (props.fullWidth ? null : '70%')};
  background-color: #f8faff;
  border-radius: 10px;
  margin: 24px 0 24px 0;
  transform-origin: top right;
  .MuiInputBase-root {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .MuiInputLabel-formControl {
    right: 0;
    left: unset;
  }
  .MuiInputLabel-shrink {
    transform-origin: top right;
    opacity: 0.6;
    color: #1e2132;
  }
  .MuiSvgIcon-root {
    color: ${(props) => props.iconColor};
  }
  .MuiInputBase-root {
    color: #000b40;
  }
  .MuiFormHelperText-root {
    text-align: right;
  }
`;

export default StyledTextField;
