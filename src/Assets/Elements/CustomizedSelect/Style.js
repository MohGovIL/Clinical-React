import styled from 'styled-components';
import { Button, Menu, MenuItem } from '@material-ui/core';

export const StyledDiv = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StyledMenu = styled(Menu)`
  & .MuiMenu-paper {
    background-color: ${(props) =>
      props.background_color ? props.background_color : null};
    color: ${(props) => (props.text_color ? props.text_color : null)};
    min-width: 130px;
  }

  & .MuiList-padding {
    padding: 0px;
  }
  & .MuiList-padding li:hover {
    background-color: #cfe2fa;
  }
`;

export const StyledButton = styled(Button)`
  background-color: ${(props) =>
    props.background_color ? props.background_color : null};
  border-radius: 14.5px;
  color: ${(props) => (props.text_color ? props.text_color : null)};
  font-weight: bold;
  margin: 0 5px 0 5px;
  padding: 5px;
  border-bottom: unset;
  height: 30px;

  .MuiButton-label {
    display: flex;
    flex-direction: ${(props) =>
      props.language_direction === 'ltr' && 'row-reverse'};
    padding: 0 5px 0 5px;
    min-width: 130px;
  }

  .MuiButton-endIcon {
    padding-left: 0;
    margin-right: auto;
  }
  .MuiButton-startIcon {
    margin-left: auto;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  text-align: right;
`;
