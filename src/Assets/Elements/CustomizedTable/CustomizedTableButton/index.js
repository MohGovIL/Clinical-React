import styled from "styled-components";
import Button from "@material-ui/core/Button";
import React from "react";

const CustomizedTableButton = styled((props) =>  <Button {...props} />)`
  border-radius: 25px;
`;

export default CustomizedTableButton;
