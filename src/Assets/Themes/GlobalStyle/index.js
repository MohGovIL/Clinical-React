import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    direction: ${props => (props.lang_id === '7' ? 'rtl' : 'ltr')};
    font-family: OpenSansHebrew;
  }
`;

export default GlobalStyle;
