import styled from "styled-components";
import {ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import GenderIcon from "../../../CustomizedTable/CustomizedTablePersonalInformationCell/GenderIcon";
import Icon from "@material-ui/core/Icon";
import TitleValueComponent from "./TitleValueComponent";

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
   height: 58px;
      background-color: #ffffff;
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
          font-weight: bold;
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
          font-weight: bold;
    }

`;

export const StyledLabelTZ = styled.label`
  display: inline-flex;
  max-width: 30%;
  min-width: 25%;
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
