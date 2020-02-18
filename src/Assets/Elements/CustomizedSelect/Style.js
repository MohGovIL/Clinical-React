import styled from "styled-components";
import {Select} from "@material-ui/core";
import {Button, Menu, MenuItem} from "@material-ui/core";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 25px 0px 25px;
`;

export const StyledMenu = styled(Menu)`
  & .MuiMenu-paper {
     background-color: ${props => props.background_color ? props.background_color : null};
     color: ${props => props.text_color ? props.text_color : null};
     min-width: 130px;
  }

  & .MuiList-padding {
    padding: 0px;
  }
`;

export const StyledButton = styled(Button)`
  background-color: ${props => props.background_color ? props.background_color : null};
  border-radius: 14.5px;
  color: ${props => props.text_color ? props.text_color : null};
  font-weight: bold;
  margin: 0px 5px 0px 5px;
  padding: 5px;
  border-bottom: 0px !important;

  .MuiButton-label {
    padding:0px 5px 0px 5px;
    justify-content: space-between;
    min-width: 130px;
  }

  .MuiButton-endIcon {
    padding-right: 24px;
    padding-left: 0px;
    margin-left: 0px;
  }
  .MuiButton-startIcon {
    padding-right: ${props => props.languageDirection == 'ltr' ? '0px' : null};
    padding-left: ${props => props.languageDirection == 'ltr' ? '0px' : null};
  }

`;

export const StyledMenuItem = styled(MenuItem)`
    text-align: right;
`;

