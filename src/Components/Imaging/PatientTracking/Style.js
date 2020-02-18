import styled from "styled-components";
import {devicesValue} from "../../../Assets/Themes/BreakPoints";

export const TableRowStyle = styled.div`
    display: flex;
  flex-direction: column;


  @media(min-width: ${devicesValue.desktop}px){
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StyledFilterBox = styled.div`
  display: flex;
  align-items: center;
  margin: 35px 0px 35px 0px;

  & .MuiListItemText-root span{
    color: #000d37;
    font-weight: unset;
    font-stretch: normal;
    font-style: normal;
  }
`;

export default styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 42px;
  background-color: #f6f6f6;
`;
