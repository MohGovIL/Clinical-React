import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import { devicesValue } from 'Assets/Themes/BreakPoints';

export default styled(AppBar)`
  z-index: 0;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-basis: 100%;
  margin-bottom: 2px;
  padding-right: 0 !important;
  box-shadow: 0 1px 10px 0 rgba(152, 151, 151, 0.3);
  @media (min-width: ${devicesValue.desktop}px) {
    flex-basis: 14%;
  }
`;
