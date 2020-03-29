import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    font-family: 'Open Sans Hebrew' !important;
    font-style: normal;
  }

  body{
    direction: ${props => (props.lang_id === '7' ? 'rtl' : 'ltr')};
  }
`;

export default GlobalStyle;
