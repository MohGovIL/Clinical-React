import styled from "styled-components";
import {devicesValue} from "../../../Assets/Themes/BreakPoints";

export default styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 87px;
  padding-left: 87px;
  padding-top: 42px;
  background-color: #f6f6f6;

  @media(min-width: ${devicesValue.desktop}px){
    flex-direction: row;
  }
`;
