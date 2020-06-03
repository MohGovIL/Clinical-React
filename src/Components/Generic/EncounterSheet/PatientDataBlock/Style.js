import styled from 'styled-components';
import ChipWithImage from 'Assets/Elements/StyledChip';
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

  .MuiFormLabel-root {
    color: #1e2132;
    font-size: 13px;
    opacity: 60%;
  }
  .MuiTypography-subtitle1 {
    color: #000b40;
    font-size: 16px;
  }
`;

export const StyledChipWithImage = styled.div`
  div.MuiGrid-container > div:first-child {
    width: 120px;
    height: 36px;
    max-width: 120px;
    max-height: 36px;
    font-size: 14px;
  }
  div.MuiGrid-container > div:first-child img {
    margin-right: 0px;
  }
  div.MuiGrid-direction-xs-column {
    flex-direction: unset;
  }
  div.MuiGrid-direction-xs-column p.MuiTypography-body1 {
    font-size: 14px;
    max-width: 120px !important;
  }
`;

export const StyledFormLabel = styled(FormLabel)`
  margin-bottom: 41px;
`;
