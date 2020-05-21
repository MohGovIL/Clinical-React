import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import { IconButton } from '@material-ui/core';

const StyledPatientBackground = styled.div`
  display: flex;
  flex-basis: 25%;
  max-width: 25%;
  margin: 120px 38px 32px 38px;
  height: calc(100vh - 88px - 32px - 32px);
  max-height: calc(100vh - 88px - 32px - 32px);
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #fafbff;
`;

export default StyledPatientBackground;

export const StyledPrevEncountersPapers = styled(Paper)`
  width: 430px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 -4px 25px 6px rgba(151, 151, 152, 0.09);
  background-color: #ffffff;
  margin: 6% 2.5%;
`;

export const StyledCurrentExaminationHeader = styled.div`
  display: flex;
  margin: 20px 23px;
  width: 100%;
  div {
    width: 30%;
    height: 22px;
    font-family: OpenSansHebrew;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    -webkit-letter-spacing: normal;
    -moz-letter-spacing: normal;
    -ms-letter-spacing: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
    margin-left: 10%;
  }
  span {
    width: 60%;
    font-family: OpenSansHebrew;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    -webkit-letter-spacing: normal;
    -moz-letter-spacing: normal;
    -ms-letter-spacing: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
    margin-left: 10%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledIcon = styled(IconButton)`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;
