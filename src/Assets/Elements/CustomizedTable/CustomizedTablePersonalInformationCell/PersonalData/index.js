import styled from "styled-components";

const PersonalData = styled.div`
   display: flex;
   flex-direction: column;
   & span{
     width: 150px;
     font-weight: bold;
     text-align: right;
     text-overflow: ellipsis;
     overflow: hidden;
     white-space: nowrap;
   }
`;

export default PersonalData;
