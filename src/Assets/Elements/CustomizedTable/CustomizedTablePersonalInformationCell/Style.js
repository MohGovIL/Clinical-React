import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";

export default styled(TableCell)`
  display: flex;
  flex-direction: row;
  padding: 14px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
