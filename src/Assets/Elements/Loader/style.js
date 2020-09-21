import styled from 'styled-components';
import { spin } from './styleKeyFrames';

export const StyledSVG = styled.svg`
  animation: ${spin} 3s ease-in infinite;
  width: 50%;
  margin: auto;
`;

export const StyleLoaderBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justifyContent: center;    
  alignItems: center;
  z-index: 99999999999;
  background:  ${props => props.opacity ?  "rgba(0, 0, 0, 0.4)" : "white"};;
`;
