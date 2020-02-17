import styled from "styled-components";
import TableContainer from "@material-ui/core/TableContainer";
import {devicesValue} from "../../../Themes/BreakPoints";

const CustomizedTableContainer = styled(TableContainer)`
  max-height: 86vh; //TODO Needs to be changed
  overflow-x: unset;
  overflow-y: auto;

  @media(min-width: ${devicesValue.desktop}px){
    width: 85%;
    max-height: calc(100vh - 88px); //TODO Needs to add here the height of the FilterBox
  }
`;

export default CustomizedTableContainer;
