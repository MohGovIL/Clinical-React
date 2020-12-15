import styled from 'styled-components';

export default styled.div`
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${(props) =>
    props.badgeContent > 0 ? '#076ce9' : '#e2efff'};
  color: ${(props) => (props.badgeContent > 0 ? '#ffffff' : '#076ce9')};
`;
