import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import {ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";
import IconValueComponent from "./DrawThisTable/IconValueComponent";

export default styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  position: relative;
  min-width: 244px;
  min-height: 40px;
  background-color: #ffffff;
  border-radius: 23px;
  @media (min-width: 1025px) {
    margin-left: 10%;
  }
`;


export const StyledPaper = styled(Paper)`
    width: 744px;
    height: auto;
    border-radius: 2px;
    box-shadow: 0 0 10px 0 rgba(152,151,151,0.3);
    background-color: #ffffff;
    position: absolute;
    margin: 26% 14%;

    &::before{
                content:'';
                position: absolute;
                top: -39px;
                right: 302px;
                border-bottom: 19px solid #ffffff;
                border-right: 30px solid transparent;
                border-left: 30px solid transparent;
                border-top: 20px solid transparent;
                z-index: 10;
   }

`;

export const StyledPaperBottom = styled(Paper)`

  height: 60px;
  box-shadow: 0 -2px 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;

  display: flex;
  justify-content: center;
`

export const StyledIconValueComponent = styled(IconValueComponent)`

`
