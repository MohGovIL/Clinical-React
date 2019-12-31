import styled from "styled-components";

const Style = styled.div`
  display: ${props => props.active ? 'none': 'flex'};
  padding-top: 15%;
  position: absolute;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-width: 203px;
  bottom: 0;
  left: 0;
  transform: translateY(85%);
  clip-path: polygon(0% 15%, 10% 15%, 15% 0%, 20% 15%, 100% 15%, 100% 100%, 0% 100%);
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);
  border-radius: 2px;
  z-index: 1;
`;

export default Style;
