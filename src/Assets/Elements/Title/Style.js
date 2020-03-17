import styled from "styled-components";

export default styled.div`
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  font-weight: ${props => props.bold ? 'bold' : null};
`;

