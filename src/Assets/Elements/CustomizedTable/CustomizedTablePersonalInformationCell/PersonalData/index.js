import styled from "styled-components";
import {devicesValue} from "../../../../Themes/BreakPoints";

const PersonalData = styled.div`
   display: flex;
   width: 100%;
   flex-direction: column;
   & span{
     width: 125px;
     font-weight: bold;
     text-align: right;
     text-overflow: ellipsis;
     overflow: hidden;
     white-space: nowrap;
     @media(min-width: ${devicesValue.desktop}px){
         width: 150px;
     }
   }
`;

export default PersonalData;
