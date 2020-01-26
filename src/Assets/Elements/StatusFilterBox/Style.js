import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import {devicesValue} from "../../Themes/BreakPoints";

export default styled(AppBar)`
  z-index: 0;
  background-color: #ffffff;
  position: relative;
  display: flex;
  box-shadow: none;
  width: 100%;
  margin-bottom: 2px;

  @media(min-width: ${devicesValue.desktop}px){
    width: 15%;
  }
`;
