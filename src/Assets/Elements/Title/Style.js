import styled from 'styled-components';

export default styled.div`
  margin: ${(props) => props.margin || null};
  margin-top: ${(props) => props.marginTop};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? 'bold' : null)};
`;
