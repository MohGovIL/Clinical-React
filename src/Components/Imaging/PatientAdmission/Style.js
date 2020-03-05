import styled from "styled-components";
import {devicesValue} from "../../../Assets/Themes/BreakPoints";

export const StyledPatientRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f6f6f6;
  padding: 32px 0 0 0;
  margin-top: 88px;
  width: 100%;
`;

export const StyledDummyBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 25%;
  height: calc(100vh - 88px);
  z-index: 1;
  position: relative;

  @media(min-width: ${devicesValue.desktop}px){
    flex-basis: 15%;
  }
`;
