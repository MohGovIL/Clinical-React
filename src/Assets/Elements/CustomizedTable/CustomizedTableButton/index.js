import styled from "styled-components";
import Button from "@material-ui/core/Button";
import React from "react";

const CustomizedTableButton = styled(({onClickHandler, ...other}) =>  <Button {...other} onClick={onClickHandler}/>)`
  border-radius: 25px;
`;

export default CustomizedTableButton;
