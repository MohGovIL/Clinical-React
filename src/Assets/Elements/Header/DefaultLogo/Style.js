import styled from "styled-components";

export default styled.div`
  position: relative;
  width: 47px;
  height: 47px;
  background-color: #28d957;
  clip-path: circle(50% at 50% 50%);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  ::before{
    background-blend-mode: multiply;
    content: '';
    width: 47px;
    height: 47px;
    position: absolute;
    //top: 50%;
    left: 50%;
    background-image: linear-gradient(to bottom, #0071ff, #0071ff);
    clip-path: circle(50% at 50% 50%);
  }
`;
