import styled from "styled-components";

export default styled.img`
  object-fit: contain;
  margin-right: 8px;
  margin-left: 8px;
  :hover{
    cursor: pointer;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;