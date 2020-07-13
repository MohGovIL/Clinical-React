import styled from 'styled-components';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import GenderIcon from 'Assets/Elements/CustomizedTable/CustomizedTablePersonalInformationCell/GenderIcon';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export const StyledExpansionPanel = styled(ExpansionPanel)`
  margin: 0 !important;
  position: inherit !important;
`;
export const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  display: flex;
  max-height: 56px;
  background-color: #ffffff;
  box-shadow: 0px 0px 12px -1px #d4d4d4;
  justify-content: space-evenly;
`;

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  width: 744px;
  height: 100%;
  display: block;
  justify-content: stretch;
`;

export const StyledBox = styled(Box)`
  margin-top: 24px;
  width: 692px;
  height: auto;
  border: solid 1px #000b4024;
  background-color: #f5f5f526;
`;
export const StyledBottomLinks = styled(Box)`
  margin: 37px 0px 24px 61px;
  display: flex;
  justify-content: flex-end;
  a.MuiButton-containedPrimary {
    background-color: #002398 !important;
  }
  a.MuiButton-contained.Mui-disabled {
    opacity: 0.4 !important;
    color: #ffffff !important;
  }
  a.MuiButton-outlined.MuiButton-outlinedPrimary.Mui-disabled {
    border: 1px solid #002398 !important;
    color: #002398 !important;
  }
`;
export const StyledHrefTableButton = styled(Button)`
  width: auto;
  height: 32px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #002398;
`;
export const StyledHrefButton = styled(Button)`
  border-radius: 25px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: center;
  height: 32px;
  width: 177px;
  margin: 3px 3px;
`;

export const StyledLabelAppointment = styled.label`
  display: inline-flex;

  margin-top: 10px;
  label {
    margin-left: 10px;
    margin-right: 0px;
  }
  span {
    width: 86px;
    height: 19px;

    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
    margin-right: 19px;
  }
  div {
    width: 103px;
    height: 19px;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
`;

export const StyledLabelStatusAppointment = styled.label`
  display: inline-flex;

  margin-top: 10px;
  label {
    margin-left: 5px;
    margin-right: -12px;
  }
  span {
    width: 80px;
    height: 18px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: right;
    text-align: -webkit-center;
    border-radius: 15px;
    background: #eaf7ff;
  }
  div {
    width: 50px;
  }
`;

export const StyledLabelServiceTypeAppointment = styled.label`
  display: inline-flex;

  margin-top: 10px;
  label {
    margin-left: 5px;
    margin-right: -12px;
  }
  span {
    width: 80px;
    height: 18px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
  }
  div {
  }
`;

export const StyledLabelName = styled.label`
  display: inline-table;
  max-width: 24%;
  min-width: 24%;
  height: 22px;
  margin-top: 10px;
  span {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #00094a;
    margin: auto;
  }
  div {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #00094a;
  }
`;

export const StyledLabelTZ = styled.label`
  display: inline-flex;
  max-width: 30%;
  min-width: 30%;
  height: 22px;
  margin-top: 10px;
  span {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
  div {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
`;

export const StyledLabelPhone = styled.label`
  display: inline-flex;
  max-width: 30%;
  min-width: 30%;
  height: 22px;
  margin-top: 10px;
  span {
    opacity: 0.6;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: right;
    color: #1e2132;
  }
  div {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #00094a;
  }
`;

export const StyledLabelAge = styled.label`
  display: inline-flex;
  max-width: 20%;
  min-width: 20%;
  height: 22px;
  margin-top: 10px;
  span {
    opacity: 0.6;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: right;
    color: #1e2132;
  }
  div {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #00094a;
  }
`;
styled(GenderIcon)``;
export const StyledIcon = styled(Icon)`
  font-family: 'Material Icons' !important;
  margin-top: 2%;
  color: #002cb1;
  height: 24px;
  cursor: pointer;
  user-select: none;
`;
export const StyledIconText = styled.div`
  cursor: pointer;
  user-select: none;
  width: 132px;
  height: 22px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #002cb1;
  margin-top: 2.5%;
`;
export const StyledValueComponent = styled.label`
  width: 100%;
  margin-top: 20px;
  margin-left: 25px;
  opacity: 0.6;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: center;
  color: navy;
`;

export const StyledLinkWithIconComponent = styled.div`
  margin: 5px 63px;
  a {
    width: 73px;
    height: 18px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: right;
    color: #002398;
  }
  ${StyledIcon} {
    width: 7px;
    height: 17px;
    object-fit: contain;
  }
`;
export const StyledTableTextCell = styled.div`
  width: 200px;
  height: 18px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledHeaderTableAppointment = styled.div`
  width: auto;
  height: 24px;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
  a {
    float: left;
    width: auto;
  }
`;

export const StyledLabelTableButton = styled.label`
  float: left;
`;

export const StyledEmptyDiv = styled.label`
  width: 108px;
`;
