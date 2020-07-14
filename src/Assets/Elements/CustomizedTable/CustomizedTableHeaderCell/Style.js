import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

const CustomizedTableHeaderCellStyle = styled(TableCell)`
  padding: 0;
  text-align: ${(props) => props.align};
  color: rgba(0, 13, 55, 0.6);
`;

export default CustomizedTableHeaderCellStyle;
