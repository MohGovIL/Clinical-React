import styled from "styled-components";
import {devicesValue} from "../../../../Assets/Themes/BreakPoints";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 71%;
  justify-content: center;
  margin:0 2% 0 38px;
  box-shadow: 0 1px 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;
  justify-content: flex-start;
  padding: 8px;

   @media(min-width: ${devicesValue.desktop}px){
     margin:0 2% 0 38px;
     flex-basis: 84%;
   }
`;
