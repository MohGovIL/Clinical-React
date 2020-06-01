import styled, { createGlobalStyle } from 'styled-components';
import { devicesValue } from 'Assets/Themes/BreakPoints';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25%;
  flex-basis: 25%;
  box-shadow: 0 1px 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;
  height: calc(100vh - 88px);
  overflow-x: scroll;
  position: ${(props) => (props.edit_mode === 1 ? 'unset' : 'fixed')};
  z-index: 100;
  max-width: ${(props) => (props.edit_mode === 1 ? '25%' : 'unset')};

  @media (min-width: ${devicesValue.desktop}px) {
    flex-basis: 17%;
    min-width: 17%;
    max-width: ${(props) => (props.edit_mode === 1 ? '16%' : 'unset')};
  }
`;

export const StyledTextInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #ffffff;

  form {
    display: flex;
    flex-direction: column;
  }

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

  .MuiInputLabel-formControl.Mui-error {
    color: #ff0000;
  }

  .MuiInput-formControl {
    width: 100%;
    color: #000b40;
  }

  .MuiFilledInput-root {
    background-color: rgba(248, 250, 255, 1);
  }

  .MuiInputLabel-shrink {
    transform-origin: ${(props) =>
      props.edit_mode === 0 ? ' top right ' : null};
  }

  .MuiFormControl-root {
    margin: 0 0 46px 0;
  }

  .MuiSelect-iconFilled {
    position: unset;
    margin-left: 17px;
    right: 10px;
    pointer-events: bounding-box;
  }
  .MuiSelect-filled.MuiSelect-filled {
    padding-right: 12px;
  }
`;

export const StyledButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 17px 0 17px;
  margin: 10px 0 62px 0;
`;

export const StyledGlobalStyle = createGlobalStyle`
  body{
    overflow-y: ${(props) =>
      props.disable_vertical_scroll === true ? 'hidden' : null};
  }
`;
