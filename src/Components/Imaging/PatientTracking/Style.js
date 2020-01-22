import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: ${props => props.desktop ? 'row' : 'column'};
  padding-right: 87px;
  padding-left: 87px;
  padding-top: 42px;
  background-color: #f6f6f6;
`;
