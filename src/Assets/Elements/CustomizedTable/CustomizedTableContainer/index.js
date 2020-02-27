import styled from "styled-components";
import TableContainer from "@material-ui/core/TableContainer";
import {devicesValue} from "../../../Themes/BreakPoints";

const CustomizedTableContainer = styled(TableContainer)`
  max-height: calc(100vh - 226px); //The height of all the elements above it
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;

  @media(min-width: ${devicesValue.desktop}px){
    width: 85%;
    max-height: calc(100vh - 154px); //The height of all the elements above it
  }
`;

export default CustomizedTableContainer;
