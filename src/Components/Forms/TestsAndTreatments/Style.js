import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import React from 'react';
export const StyledConstantTextField = styled(TextField)`
  width: 104px;
  height: 56px;
  border-radius: 10px;
  background-color: #f8faff;
  margin: 2% 16px;

  .MuiInputLabel-formControl {
    color: #000b40;
    width: 86px;
    height: 22px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
  }
  input {
    text-align: center;
  }
`;
export const StyledVariantTextField = styled(TextField)`
  height: 56px;
  border-radius: 10px;
  background-color: #f8faff;
  margin: 2% 16px;

  .MuiInputLabel-formControl {
    color: #000b40;
    width: 86px;
    height: 22px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
  }
  input {
    text-align: center;
  }
`;

export const StyledConstantHeaders = styled.label`
  width: 135px;
  height: 30px;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
`;
export const StyledLabelWithHourComponent = styled.div`
  margin-right: 18px;
  label {
    width: 54px;
    height: 40px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
  span {
    width: 37px;
    height: 18px;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    text-align: center;
    color: #076ce9;
  }
`;
export const StyledVarientIndicatorsTR = styled.tr`
  width: 888px;
  height: 114px;
  border-radius: 10px;
  box-shadow: 0 1px 12px 3px rgba(151, 151, 152, 0.09);
  background-color: #ffffff;
`;

export const StyledForm = styled.form`
  width: 1034px;
  height: 1550px;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;
`;

export const StyledTestsAndTreatments = styled.div`
  margin-right: 60px;
  margin-left: 48px;
`;
