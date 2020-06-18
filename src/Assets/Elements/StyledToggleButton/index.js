import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';

const StyledToggleButton = styled(ToggleButton)`
  border-radius: 25px !important;
  height: 40px !important;
  width: 122px !important;
  font-size: 15px !important;
  line-height: 1.2 !important;
  color: rgba(0, 11, 64, 0.6) !important ;
  border: 0 !important;
  &.Mui-selected {
    font-weight: bold !important;
    background-color: #002398 !important;
    color: #ffffff !important;
  }
`;

export default StyledToggleButton;
