import styled from "styled-components";

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  color: #f8f8f8;
  height: 100%;
  border-bottom: ${props => props.active ? 'solid 4px #ffffff' : 'none' };
  min-width: 124px;
`;

export default HeaderItem;
