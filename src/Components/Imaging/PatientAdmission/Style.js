import styled from "styled-components";
import {devicesValue} from "../../../Assets/Themes/BreakPoints";
import {Backdrop} from '@material-ui/core';

export const StyledBackdrop = styled(Backdrop)`
  z-index: ${props => props.edit_mode === 1 ? 1 : 2} ;
  display: block;
  //overflow-y: scroll;
  position:  ${props => props.edit_mode === 1 ? "absolute" : "fixed"};
  margin-bottom: 0px;
  background-color: ${props => props.edit_mode === 1 ? "rgba(0, 13, 55, 0.5)" : "unset"};
  padding-top: 120px;
`;

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
  z-index: ${props => props.edit_mode === 1 ? 0 : 1};
  position: relative;

  @media(min-width: ${devicesValue.desktop}px){
    flex-basis: 15%;
  }
`;
