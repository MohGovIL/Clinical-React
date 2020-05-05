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
    margin: 26% -710%;
    border-top: 0;
`;

export const StyledTriangle = styled.div`
   content: '';
    height: 31px;
    width: 53px;
    margin: -42% 0%;
    right: 279px;
    -webkit-clip-path: polygon(50% 0%,0% 100%,100% 100%);
    -webkit-clip-path: polygon(50% 0%,0% 100%,100% 100%);
    clip-path: polygon(50% 0%,0% 100%,100% 100%);
    z-index: 5;
    background-color: #ffffff;
`;

export const StyledPaperBottom = styled(Paper)`
  height: 60px;
  box-shadow: 0 -2px 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;

  display: flex;
  justify-content: center;
`;

export const StyledIconValueComponent = styled(IconValueComponent)`

`;
// 88px are the headers height
// ~60px are the height of every element in the container
// ~18px is the height of the add box

export const StyledPaperContainer = styled.div`

    max-height: calc(100vh - 88px - 60px - 18px);
    min-height: 56px;
    overflow : hidden;

    &:hover {
            overflow-y :${props => props.height  > props.maxHeight  ? 'auto !important' :'hidden'};

    }




`;
export const StyledContainer = styled.div`
width: 744px;
height: 315px;
`;

export const WrapperSearchPaper = styled.div`
    position: relative;
   position: absolute;
    left: 30%;
    top: 100%;
}
`;
