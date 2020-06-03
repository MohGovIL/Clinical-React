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

// Import Regular OpenSans font
import OpenSansRegularTtf from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-regular.ttf';
import OpenSansRegularWoff from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-regular.woff';
import OpenSansRegularWoff2 from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-regular.woff2';
import OpenSansRegularEot from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-regular.eot';
import OpenSansRegularSvg from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-regular.svg';

// Import Bold OpenSans font
import OpenSansBoldTtf from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-700.ttf';
import OpenSansBoldWoff from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-700.woff';
import OpenSansBoldWoff2 from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-700.woff2';
import OpenSansBoldEot from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-700.eot';
import OpenSansBoldSvg from 'Assets/Themes/GlobalStyle/fonts/open-sans-v17-latin-700.svg';

const baseRoutePathUrl =
  baseRoutePath().length > 0 ? baseRoutePath() + '/' : baseRoutePath();

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

  /* open-sans-regular - latin */
  @font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: url(${baseRoutePathUrl}${OpenSansRegularEot}); /* IE9 Compat Modes */
  src: local('Open Sans'), local('Open Sans'),
       url(${baseRoutePathUrl}${OpenSansRegularEot}?#iefix) format('embedded-opentype'), /* IE6-IE8 */
       url(${baseRoutePathUrl}${OpenSansRegularWoff2}) format('woff2'), /* Super Modern Browsers */
       url(${baseRoutePathUrl}${OpenSansRegularWoff}) format('woff'), /* Modern Browsers */
       url(${baseRoutePathUrl}${OpenSansRegularTtf}) format('truetype'), /* Safari, Android, iOS */
       url(${baseRoutePathUrl}${OpenSansRegularSvg}#OpenSans) format('svg'); /* Legacy iOS */
}
/* open-sans-700 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  src: url(${baseRoutePathUrl}${OpenSansBoldEot}); /* IE9 Compat Modes */
  src: local('Open Sans'), local('Open Sans'),
       url(${baseRoutePathUrl}${OpenSansBoldEot}?#iefix) format('embedded-opentype'), /* IE6-IE8 */
       url(${baseRoutePathUrl}${OpenSansBoldWoff2}) format('woff2'), /* Super Modern Browsers */
       url(${baseRoutePathUrl}${OpenSansBoldWoff}) format('woff'), /* Modern Browsers */
       url(${baseRoutePathUrl}${OpenSansBoldTtf}) format('truetype'), /* Safari, Android, iOS */
       url(${baseRoutePathUrl}${OpenSansBoldSvg}#OpenSans) format('svg'); /* Legacy iOS */
}

  *{
    font-family: ${(props) =>
      props.lang_code === 'he'
        ? 'Open Sans Hebrew !important'
        : 'Open Sans !important'};
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
