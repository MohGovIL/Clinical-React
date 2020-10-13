import styled from 'styled-components';
import { spin } from './styleKeyFrames';

export const StyledSVG = styled.svg`
  animation: ${spin} 3s ease-in infinite;
  width: 250px;
  margin: 40px auto 20px;
`;

export const StyleLoaderBox = styled.div`
  position: absolute;
  top:  0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  justify-content: center;
  align-items: center;
  z-index: 1300;
  text-align: center;
  background: ${(props) => (props.opacity ? 'rgba(0, 0, 0, 0.4)' : 'white')};
`;
