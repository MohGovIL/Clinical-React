import styled, {createGlobalStyle} from "styled-components";
import {DatePicker} from '@material-ui/pickers/';

export const StyledDatePicker = styled(DatePicker)`
& .MuiInputBase-root {
   text-align: center !important;
   margin-top: 5px;
}
& .MuiInputBase-root .MuiInput-input {
  text-align: center;
  margin: 0px 2px 0px 2px;
  padding: 0px;
  color: ${props => props.text_color ? props.text_color : null};
}
`;

export const GlobalStyledDatePicker = createGlobalStyle`
  .MuiPopover-paper .MuiPickersCalendarHeader-dayLabel {
    color: #000000;
    font-weight: bold;
    font-size: 16px;
  }

  button.MuiIconButton-root {
    padding: 5px;
  }

  .MuiPaper-root .MuiPickersCalendarHeader-switchHeader p.MuiTypography-root {
    color: ${props => props.iconColor ? props.iconColor : null}
  }

  .MuiPaper-root .MuiPickersCalendarHeader-switchHeader span.MuiIconButton-label {
    transform: rotate(${props => props.langDirection === 'rtl' ? '180deg' : '0def'});
    color: ${props => props.iconColor ? props.iconColor : null} !important;
  }
`;
