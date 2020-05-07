import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';

export default styled(Tabs)`
  color: #002398;
  & .MuiTabs-indicator {
    background-color: #002398;
    width: 5px;
  }
  & .Mui-selected {
    font-weight: bold;
    background-color: #eaf7ff;
  }
`;
