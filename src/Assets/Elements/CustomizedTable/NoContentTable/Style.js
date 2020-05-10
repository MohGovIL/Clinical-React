import styled from 'styled-components';
import { devicesValue } from '../../../Themes/BreakPoints';

export const Styledh1 = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000662;
  margin-top: 30px;
  margin-bottom: 8px;
`;

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3),
    0 0 10px 0 rgba(152, 151, 151, 0.3);
  @media (min-width: ${devicesValue.desktop}px) {
    flex-basis: 85%;
  }
`;
