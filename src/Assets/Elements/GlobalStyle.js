import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    direction: ${props => (props.rtl ? 'rtl' : 'ltr')};
    background-color: #f4f4f4;
    font-family: OpenSansHebrew;
  }
`;

export default GlobalStyle;
