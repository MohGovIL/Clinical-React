import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    font-family: 'Open Sans Hebrew' !important;
    font-style: normal;
  }

  body{
    direction: ${props => (props.languageDirection === 'rtl' ? 'rtl' : 'ltr')};
  }

  ::-webkit-scrollbar {
    width: 4px;
}

/*Changing of style of scrollbars in Google Chrome*/
/* Track */
::-webkit-scrollbar-track {
    background: #f0f0f0;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #cdcdd2;
    border-radius: 9px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover{
    background: #04C2;
}
`;

export default GlobalStyle;
