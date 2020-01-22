import Tabs from "@material-ui/core/Tabs";
import styled from "styled-components";
// import React from "react";
import {devicesValue} from "../../../Themes/BreakPoints";

// export default styled(({...other}) => <Tabs {...other} />)`
//   margin: 0;
//   & .MuiTabs-indicator {
//     color: #ffffff;
//     border: solid 2px #ffffff;
//     background-color: #ffffff;
//     border-radius: 5px;
//   }
//
//   & .Mui-selected {
//   font-weight: bold;
//   }
//
//   @media (min-width: ${devicesValue.desktop}px){
//       margin: 0 60px;
//
//   }
// `;

export default styled(Tabs)`
  margin: 0;
  & .MuiTabs-indicator {
    color: #ffffff;
    border: solid 2px #ffffff;
    background-color: #ffffff;
    border-radius: 5px;
  }

  & .Mui-selected {
  font-weight: bold;
  }

  @media (min-width: ${devicesValue.desktop}px){
      margin: 0 60px;

  }
`;
