import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
export default styled(TableRow)`
  & .MuiTableCell-root{
    width: ${props => (props.columnNumber * 100)};//TODO get the width of the container
  }
`;
