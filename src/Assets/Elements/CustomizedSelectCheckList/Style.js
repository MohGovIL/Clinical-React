import styled from 'styled-components';
import { Autocomplete } from '@material-ui/lab';
import Typography from "@material-ui/core/Typography";

export const StyledAutocomplete = styled(Autocomplete)`
  .MuiFormControl-root .MuiInputBase-root {
    padding-right: 0;
  }
`;

export const  StyleLTRTypography = styled(Typography)`
    direction:  ${(props) => (props.forceLtr ? 'ltr' : 'inherit')};
`