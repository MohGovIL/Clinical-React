import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    direction: ${props => (props.languageDirection ? props.languageDirection : null)};
    font-family: OpenSansHebrew;
  }
`;

export default GlobalStyle;
