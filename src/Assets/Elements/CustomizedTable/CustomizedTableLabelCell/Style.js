import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

export default styled((props) => <TableCell {...props} />)`
  color: ${props => props.color ? props.color : null}
`;
