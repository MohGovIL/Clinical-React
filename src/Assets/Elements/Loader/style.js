import styled from 'styled-components';
import { spin } from './styleKeyFrames';

export const StyledSVG = styled.svg`
  animation: ${spin} 3s ease-in infinite;
  width: 50%;
  margin: 40px auto 20px;
`;

export const StyleLoaderBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: o;
  width: 100%;
  height: 100%;
  display: flex;
  justifycontent: center;
  alignitems: center;
  z-index: 99999999999;
  background: ${(props) => (props.opacity ? 'rgba(0, 0, 0, 0.4)' : 'white')};
`;
