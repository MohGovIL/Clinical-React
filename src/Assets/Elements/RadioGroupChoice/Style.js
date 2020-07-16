import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

export const StyledRadioGroup = styled.div`
  .MuiTypography-h6 {
    font-size: 18px;
  }
`;

export const StyledRadio = styled(Radio)`
  .MuiIconButton-label {
    background-color: #dadbda;
    box-shadow: inset 0 1px 3px 0 rgba(27, 27, 27, 0.5);
    border-radius: 50%;
  }

`;
