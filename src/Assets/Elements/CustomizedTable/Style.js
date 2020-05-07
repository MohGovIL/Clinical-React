import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import { devicesValue } from 'Assets/Themes/BreakPoints';

const StyledCustomizedTable = styled(Table)`
  background-color: #ffffff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  border-collapse: unset;
  table-layout: auto;
  @media (min-width: ${devicesValue.desktop}px) {
    table-layout: fixed;
  }
`;

export default StyledCustomizedTable;
