import styled from 'styled-components';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  margin-right: 40px;
  margin-left: 40px;
  .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) {
    border-left: 0;
    border-right: 0;
    border-top-left-radius: initial;
    border-bottom-left-radius: initial;
  }
  .MuiToggleButtonGroup-groupedHorizontal:not(:last-child) {
    border-top-right-radius: initial;
    border-bottom-right-radius: initial;
  }
`;

export default StyledToggleButtonGroup;
