import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  min-width: 200px;
  min-height: 100px;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;
  border-radius: 2px;
  color: #0027a5;
  z-index: 9999;
  ::before{
    content: '';
    background-color: #ffffff;
    top: 0;
    left: 5px;
    height: 13px;
    width: 15px;
    position: absolute;
    transform: translateY(-100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;
