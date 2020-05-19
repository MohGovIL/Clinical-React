import { createGlobalStyle } from 'styled-components';

//Import Regular OpenSansHebrew font
import OpenSansHebrewRegularEot from './fonts/OpenSansHebrew-Regular.eot';
import OpenSansHebrewRegularTtf from './fonts/OpenSansHebrew-Regular.ttf';
import OpenSansHebrewRegularWoff from './fonts/OpenSansHebrew-Regular.woff';
import OpenSansHebrewRegularWoff2 from './fonts/OpenSansHebrew-Regular.woff2';

//Import Bold OpenSansHebrew font
import OpenSansHebrewBoldEot from './fonts/OpenSansHebrew-Bold.eot';
import OpenSansHebrewBoldTtf from './fonts/OpenSansHebrew-Bold.ttf';
import OpenSansHebrewBoldWoff from './fonts/OpenSansHebrew-Bold.woff';
import OpenSansHebrewBoldWoff2 from './fonts/OpenSansHebrew-Bold.woff2';

const GlobalStyle = createGlobalStyle`

  //Regular OpenSansHebrew font
  @font-face {
    font-family: 'Open Sans Hebrew';
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans Hebrew'), local('Open Sans Hebrew'),
    url(${OpenSansHebrewRegularEot}),
    url(${OpenSansHebrewRegularEot}?#iefix) format('embedded-opentype'),
    url(${OpenSansHebrewRegularWoff2}) format('woff2'),
    url(${OpenSansHebrewRegularWoff}) format('woff'),
    url(${OpenSansHebrewRegularTtf}) format('truetype');
  }

  //Bold OpenSansHebrew font
  @font-face {
    font-family: 'Open Sans Hebrew';
    font-style: normal;
    font-weight: 700;
    src: local('Open Sans Hebrew'), local('Open Sans Hebrew'),
    url(${OpenSansHebrewBoldEot}),
    url(${OpenSansHebrewBoldEot}?#iefix) format('embedded-opentype'),
    url(${OpenSansHebrewBoldWoff2}) format('woff2'),
    url(${OpenSansHebrewBoldWoff}) format('woff'),
    url(${OpenSansHebrewBoldTtf}) format('truetype');
  }

  *{
    font-family: 'Open Sans Hebrew' !important;
    font-style: normal;
  }

  body{
    direction: ${(props) =>
      props.lang_id === '7' || props.language_direction === 'rtl'
        ? 'rtl'
        : 'ltr'};
  }

/*Changing of style of scrollbars in Google Chrome*/
::-webkit-scrollbar {
    width: 4px;
}

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
