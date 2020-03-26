import styled from "styled-components";
import {devicesValue} from "../../../../Assets/Themes/BreakPoints";
import {Divider, TextField} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const StyledDivider = styled(Divider)`
  margin: 10px 0 40px 0;
`;

export const StyledTextField = styled(TextField)`
  width: 70%;
  background-color:  #f8faff;
  border-radius: 10px;
  margin: 24px 0 24px 0;
  transform-origin: top right;
  .MuiInputLabel-formControl {
    right: 0;
    left: unset;
  }

  .MuiInputLabel-shrink {
    transform-origin: top right;
    opacity: 0.6;
    color: #1e2132;
  }
`;

export const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  width: 70%;
  background-color:  #f8faff;
  border-radius: 10px;
  margin: 24px 0 24px 0;
  transform-origin: top right;
  .MuiInputLabel-formControl {
    right: 0;
    left: unset;
  }

  .MuiInputLabel-shrink {
    transform-origin: top right;
    opacity: 0.6;
    color: #1e2132;
  }
`;

export const StyledAutoComplete = styled(Autocomplete)`
//TODO make the padding disappear
  & .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot {
    padding-right: 0;
  }
`;

export const StyledForm = styled.form`
  margin: 55px 55px 0 55px;
  width: calc(100% - 110px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const StyledPatientDetails = styled.div`
  display: flex;
  flex-basis: 70%;
  box-shadow: 0 1px 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 25px 0 25px;

   @media(min-width: ${devicesValue.desktop}px){
     flex-basis: 50%;
     margin: 0 38px 0 38px;
   }
`;

export const StyledFormGroup = styled.div`
   display: flex;
   flex-direction: column;
   margin: 50px 0 50px 0;
`;
