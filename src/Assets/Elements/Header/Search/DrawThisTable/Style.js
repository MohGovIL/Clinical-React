import styled from "styled-components";
import {ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import GenderIcon from "../../../CustomizedTable/CustomizedTablePersonalInformationCell/GenderIcon";
import Icon from "@material-ui/core/Icon";
import TitleValueComponent from "./TitleValueComponent";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

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
    height: 315px;
    display: block;
    justify-content: stretch;
`;

export const StyledBox = styled(Box)`
  margin-top:24px;
 /* margin-left: 24px;
  margin-right:28px;*/
  width: 692px;
  height: 204px;
  overflow: auto;
  /*opacity: 0.2;*/
  border: solid 1px #000b4024;
  background-color: #f5f5f526;;
 /*  justify-content: space-evenly;*/
   /* display: flex;*/
`;
export const StyledBottomLinks = styled(Box)`
    margin: 37px 0px 24px 61px;
    display: flex;
    justify-content: flex-end;
    a.MuiButton-containedPrimary{
         background-color: #002398 !important;
    }
    a.MuiButton-contained.Mui-disabled{
        opacity: 0.4 !important;
        color: #ffffff !important;
    }
    a.MuiButton-outlined.MuiButton-outlinedPrimary.Mui-disabled{
    border: 1px solid #002398 !important;
    color: #002398 !important;
    }
`;

export const StyledHrefButton = styled(Button)`
    border-radius: 25px;
    font-family: OpenSansHebrew;
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
}

`;

export const StyledLabelAppointment = styled.label`

  display: inline-flex;
 /* max-width: 30%;
  min-width: 30%;
  height: 22px;*/
  margin-top: 10px;
    label{
        margin-left: 5px;
        margin-right: -12px;
    }
    span {
        width: 86px;
        height: 19px;
        font-family: OpenSansHebrew;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: right;
        color: #000b40;
        margin-right:19px;
    }
    div{
        width: 86px;
        height: 19px;
        font-family: OpenSansHebrew;
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
 /* max-width: 30%;
  min-width: 30%;
  height: 22px;*/
  margin-top: 10px;
    label{
        margin-left: 5px;
        margin-right: -12px;
    }
    span {
        width: 80px;
        height: 18px;
        font-family: OpenSansHebrew;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        text-align: right;

        text-align: -webkit-center;
        border-radius: 15px;
        background :  #eaf7ff;
    }
    div{
    width:50px;
  }
`;

export const StyledLabelServiceTypeAppointment = styled.label`

  display: inline-flex;
 /* max-width: 30%;
  min-width: 30%;
  height: 22px;*/
  margin-top: 10px;
    label{
        margin-left: 5px;
        margin-right: -12px;
    }
    span {
        width: 80px;
        height: 18px;
        font-family: OpenSansHebrew;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
    }
    div{

  }
`;

export const StyledLabelName = styled.label`
  display: inline-flex;
  max-width: 20%;
  min-width: 20%;
  height: 22px;
  margin-top: 10px;
    span{

          font-family: OpenSansHebrew;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: right;
          color: #00094a;

    }
    div{

          font-family: OpenSansHebrew;
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
  span{

          font-family: OpenSansHebrew;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: right;
          color: #000b40;
  }
  div{

          font-family: OpenSansHebrew;
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
  span{
        opacity: 0.6;
        font-family: OpenSansHebrew;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: normal;
        text-align: right;
        color: #1e2132;
  }
  div{
        font-family: OpenSansHebrew;
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
  span{
        opacity: 0.6;
        font-family: OpenSansHebrew;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: normal;
        text-align: right;
        color: #1e2132;
  }
  div{
        font-family: OpenSansHebrew;
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

export const StyledGenderIcon = styled(GenderIcon)`


`;

export const StyledIcon = styled(Icon)`
    margin-top: 2%;
    color: #002cb1;
    height: 24px;
`;
export const StyledIconText = styled.div`
width: 132px;
  height: 22px;
  font-family: OpenSansHebrew;
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

        width:100%;
        margin-top: 20px;
        margin-left: 25px;
        opacity: 0.6;
        font-family: OpenSansHebrew;
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

    margin: 5px 0px;
    a{
      width: 73px;
      height: 18px;
      font-family: OpenSansHebrew;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: normal;
      text-align: right;
      color: #002398;
     }

    ${StyledIcon}{
        width: 7px;
        height: 17px;
        object-fit: contain;
    }

  }
`;
