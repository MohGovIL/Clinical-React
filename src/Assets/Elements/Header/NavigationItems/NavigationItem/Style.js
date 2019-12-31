import styled from "styled-components";

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  word-wrap: break-word;
  border-bottom: ${props => props.active ? 'solid 4px #ffffff' : 'none'};
  color: #f8f8f8;
  font-weight: bold;
  :hover {
    cursor: pointer;
    border-bottom: solid 4px #ffffff;
  }
`;

export default Style;
