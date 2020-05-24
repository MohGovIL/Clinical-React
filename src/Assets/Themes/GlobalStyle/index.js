import { createGlobalStyle } from 'styled-components';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';

//Import Regular OpenSansHebrew font
import OpenSansHebrewRegularEot from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Regular.eot';
import OpenSansHebrewRegularTtf from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Regular.ttf';
import OpenSansHebrewRegularWoff from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Regular.woff';
import OpenSansHebrewRegularWoff2 from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Regular.woff2';

//Import Bold OpenSansHebrew font
import OpenSansHebrewBoldEot from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Bold.eot';
import OpenSansHebrewBoldTtf from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Bold.ttf';
import OpenSansHebrewBoldWoff from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Bold.woff';
import OpenSansHebrewBoldWoff2 from 'Assets/Themes/GlobalStyle/fonts/OpenSansHebrew-Bold.woff2';

const baseRoutePathUrl = baseRoutePath().length > 0 ? baseRoutePath() + '/' : baseRoutePath();

const GlobalStyle = createGlobalStyle`

  //Regular OpenSansHebrew font
  @font-face {
    font-family: 'Open Sans Hebrew';
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans Hebrew'), local('Open Sans Hebrew'),
    url(${baseRoutePathUrl}${OpenSansHebrewRegularEot}),
    url(${baseRoutePathUrl}${OpenSansHebrewRegularEot}?#iefix) format('embedded-opentype'),
    url(${baseRoutePathUrl}${OpenSansHebrewRegularWoff2}) format('woff2'),
    url(${baseRoutePathUrl}${OpenSansHebrewRegularWoff}) format('woff'),
    url(${baseRoutePathUrl}${OpenSansHebrewRegularTtf}) format('truetype');
  }

  //Bold OpenSansHebrew font
  @font-face {
    font-family: 'Open Sans Hebrew';
    font-style: normal;
    font-weight: 700;
    src: local('Open Sans Hebrew'), local('Open Sans Hebrew'),
    url(${baseRoutePathUrl}${OpenSansHebrewBoldEot}),
    url(${baseRoutePathUrl}${OpenSansHebrewBoldEot}?#iefix) format('embedded-opentype'),
    url(${baseRoutePathUrl}${OpenSansHebrewBoldWoff2}) format('woff2'),
    url(${baseRoutePathUrl}${OpenSansHebrewBoldWoff}) format('woff'),
    url(${baseRoutePathUrl}${OpenSansHebrewBoldTtf}) format('truetype');
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
