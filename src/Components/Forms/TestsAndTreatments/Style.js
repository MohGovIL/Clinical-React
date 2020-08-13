import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
  height: 56px;
  border-radius: 10px;
  background-color: #f8faff;
  label + .MuiInput-formControl {
    margin: 15px 6px;
    width: 104px;
  }
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
    text-align: end;
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
  margin-top: 10px;
`;
export const StyledLabelWithHourComponent = styled.div`
  text-align: right;
  label {
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

export const StyledVariantForm = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin-bottom: 40px;
`;
export const StyledConstantForm = styled.div`
  margin-bottom: 40px;
`;
export const StyledTestsAndTreatments = styled.div``;
export const StyledTable = styled(Table)`
  .MuiInputLabel-formControl {
    left: 19px;
  }
  display: flex;
  .MuiTableCell-root {
    padding: 2px;
  }
`;

export const StyledTreatmentInstructionsButton = styled(Button)`
  /*width: 200px;*/
  height: 32px;
  border-radius: 25px;
  border: solid 1px #002398;
  /*float: left;*/
  width: auto;
  height: 32px;
  border-radius: 25px;
  border: solid 1px #002398;
  float: ${(props) => (props.languageDirection === 'rtl' ? 'left' : 'right')};
  span {
    /* width: 110px;
    height: 22px;*/
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.1px;
    text-align: right;
    color: #002398;
  }
`;

export const StyledCardRoot = styled(Card)`
  display: flex;
  padding: 27px;
  box-shadow: 0 1px 12px 3px rgba(151, 151, 152, 0.09);
`;

export const StyledCardDetails = styled.div`
  display: flex;
  flexdirection: column;
`;

export const StyledCardContent = styled(CardContent)`
  flex: 1 0 auto;
  border-left: 1px solid #d4cfcf;
  margin-left: 22px;
  width: 20%;
  margin-top: 23px;
`;
export const StyledCardCover = styled(CardMedia)`
  width: 95%;
`;
export const StyledCardName = styled.div`
  display: flex;
  alignitems: center;
  paddingleft: 1%;
  paddingbottom: 1%;
`;
export const StyledTypographyHour = styled(Typography)`
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  text-align: center;
  h6 {
    color: #076ce9;
  }
`;
export const StyledTypographyName = styled(Typography)`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
`;

export const StyledInstructions = styled.div``;
export const StyledIconedButton = styled(Button)`
  width: 150px;
  height: 40px;
  border-radius: 0px 23.5px 23.5px 0px;
  background-color: #eaf7ff;
  top: 34%;
  right: 32%;

  p {
    width: 89px;
    height: 20px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }

  div {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 14px 0 rgba(165, 166, 169, 0.2);
    border-radius: 23.5px;
    background-color: #ffffff;
  }
  img {
    width: 14px;
    height: 17px;
    margin: 8px 8px;
  }
`;

export const StyledSubHeader = styled.p`
  width: 346px;
  height: 22px;

  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
`;

export const StyledHiddenDiv = styled.div`
  display: ${(props) => (props.dontDisplay ? 'none' : '')};
`;

export const StyledHeader = styled.p`
  width: 347px;
  height: 33px;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
`;
