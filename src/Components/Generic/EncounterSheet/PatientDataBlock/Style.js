import styled from 'styled-components';
import { FormLabel } from '@material-ui/core';

export const StyledPatientDataBlock = styled.div`
  display: flex;
  flex-basis: 17%;
  max-width: 17%;
  margin: 120px 0 0 32px;
  height: calc(100vh - 88px - 32px - 32px);
  max-height: calc(100vh - 88px - 32px - 32px);
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);

  overflow-y: scroll;
  overflow-x: hidden;
  
  .MuiInputLabel-formControl {
    right: ${(props) => (props.languageDirection === 'rtl' ? '0' : 'unset')};
    left: unset;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: right;
    color: #1e2132;
    opacity: 60%;
    direction: ${(props) =>
      props.languageDirection === 'rtl' ? 'ltr' : 'rtl'};
  }
`;

export const StyledTextInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 46px 31px 0 0;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #ffffff;

  .MuiTypography-subtitle1 {
    color: #000b40;
    font-size: 16px;
  }

  div.MuiGrid-container > div.MuiGrid-item {
    padding-top: 13px;
    padding-bottom: 13px;
  }
`;

export const StyledChipWithImage = styled.div`
  div.MuiGrid-container > div:first-child {
    width: 120px;
    height: 36px;
    max-width: 120px;
    max-height: 36px;
    font-size: 14px;
    padding: 0 17px 0 17px;
  }
  div.MuiGrid-container > div:first-child img {
    margin-right: 0px;
    width: 13px;
    height: 18px;
  }
  div.MuiGrid-direction-xs-column {
    flex-direction: unset;
  }
  div.MuiGrid-direction-xs-column p.MuiTypography-body1 {
    font-size: 14px;
    max-width: 100px !important;
    direction: ltr;
  }
  div.MuiGrid-direction-xs-column > p:last-child {
    font-size: 11.7px;
    color: #7f869b;
  }
`;

export const StyledReasonLabel = styled.label`
  color: #1e2132;
  font-size: 13px;
  opacity: 60%;
`;

export const StyledEncounterDocLabel = styled(FormLabel)`
  margin-bottom: 41px;
  font-size: 16px;
  color: #000b40;
  opacity: 60%;
`;

export const StyledAdmissionFormButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  button.MuiButtonBase-root {
    width: 104px !important;
    height: 32px;
  }
`;

export const StyledAvatarIdBlock = styled.div`
  div:first-child > div:last-child {
   margin: 31px;
   width: auto;
  }
`;
