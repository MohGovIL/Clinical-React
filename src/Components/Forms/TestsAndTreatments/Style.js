import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
export const StyledConstantTextField = styled(TextField)`
  width: 104px;
  height: 56px;
  border-radius: 10px;
  background-color: #f8faff;
  margin: 2px 10px;
  .MuiInputLabel-shrink {
    transform: translate(24.5px, 3.5px) scale(0.75);
    transform-origin: top left;
  }
  input {
    text-align: center;
  }
`;
export const StyledVariantTextField = styled(TextField)`
  /*width: 104px;*/
  height: 56px;
  border-radius: 10px;
  background-color: #f8faff;

  .MuiInputLabel-shrink {
    transform: translate(24.5px, 3.5px) scale(0.75);
    transform-origin: top left;
  }
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
  text-align: right;
  label {
    /* width: 54px;*/
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
    /* width: 37px;*/
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
export const StyledVarientIndicatorsTR = styled(TableRow)`
  width: 888px;
  height: 114px;
  border-radius: 10px;
  box-shadow: 0 1px 12px 3px rgba(151, 151, 152, 0.09);
  background-color: #ffffff;
  margin-bottom: 10px;
`;

export const StyledVariantForm = styled.form`
  overflow: auto;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;
  /* .MuiInputLabel-shrink {
    transform: translate(24.5px, 5.5px) scale(0.75);
    transform-origin: top left;
  }*/
`;
export const StyledConstantForm = styled.form``;
export const StyledTestsAndTreatments = styled.div``;
export const StyledTable = styled(Table)`
  display: flex;
`;
