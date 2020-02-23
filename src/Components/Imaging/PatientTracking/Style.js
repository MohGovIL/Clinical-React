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
  margin: 35px 0 35px 0;

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
  background-color: #f6f6f6;
  padding-right: 87px;
  padding-left: 87px;
  min-height: calc(100vh - 88px);
    @media(min-width: ${devicesValue.desktop}px){
      padding: 0;
    }
`;
