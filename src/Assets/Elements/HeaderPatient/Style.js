import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import {Breadcrumbs} from "@material-ui/core/";
import {IconButton} from "@material-ui/core";
// import {devicesValue} from '../../Themes/BreakPoints';

export default styled(AppBar)`
    flex-direction: row;
    align-items: center;
    color: #fafafa;
    height: 88px;
    background-image: linear-gradient(86deg, #002398 1%, #076ce9 148%);
    box-shadow: 0 2px 4px 0 rgba(90, 90, 90, 0.5);
    padding-right: 46px;
    padding-left: 25px;

    & span{
      margin-right: 8px;
      margin-left: 8px;
    }

    .MuiTypography-root {
      font-size: 28px;
      text-decoration: none;
    }
`;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #ffffff;
`;

export const StyledIconButton = styled(IconButton)`
  display: flex;
  flex-direction: row;
  margin-right: ${props => props.language_direction === "rtl" ? "auto" : null } ;
  margin-left: ${props => props.language_direction === "ltr" ? "auto" : null } ;
  justify-content: left;
  min-width: 32px;
  min-height: 32px;
  object-fit: contain;
`;

