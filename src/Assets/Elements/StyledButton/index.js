import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  border-radius: 25px;
  height: 50px;
  width: 158px;
  letter-spacing: ${({ letterSpacing }) => letterSpacing || null};
  font-weight: ${({ fontWeight }) => fontWeight || null};
  .MuiButton-startIcon {
    margin-left: 8px;
  }
`;
