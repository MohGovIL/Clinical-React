import styled from 'styled-components';

const StyledIconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  > * {
    cursor: pointer;
  }
  ::before {
    content: '';
    display: ${(props) => !props.open && 'none'};
    background-color: #ffffff;
    bottom: 0;
    left: 5px;
    height: 13px;
    width: 15px;
    position: absolute;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;

export default StyledIconWrapper;
