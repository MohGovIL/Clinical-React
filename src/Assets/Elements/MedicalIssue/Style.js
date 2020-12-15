import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

export const StyledDiv = styled.div`
  margin-top: 42px;
`;

export const StyledTitleTypography = styled(Typography)`
  color: #000b40;
  font-weight: bold;
  font-size: 18px;
`;

export const StyledTypography = styled(Typography)`
  color: #000b40;
  font-size: 16px;
  opacity: 60%;
`;

export const StyledChip = styled(Chip)`
  border-radius: 25px;
  background-color: rgba(0, 58, 199, 0.13);
  height: 24px;

  .MuiChip-label {
    color: #000b40;
    font-size: 13px;
  }
`;

export const StyledContentBlock = styled.div`
  margin-top: 16px;
`;
