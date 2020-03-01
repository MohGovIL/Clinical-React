import styled from "styled-components";
import {devicesValue} from "../../../Assets/Themes/BreakPoints";

export const StyledPatientRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f6f6f6;
  padding: 32px 0 0 0;
  margin-top: 88px;
`;

export const StyledDummyBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  height: calc(100vh - 88px);
  padding: 8px 0;
  z-index: 1;
  position: relative;

  @media(min-width: ${devicesValue.desktop}px){
    flex-basis: 15%;
  }
`;
