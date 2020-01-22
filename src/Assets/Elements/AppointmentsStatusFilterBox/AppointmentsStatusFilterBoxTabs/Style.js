import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
// import React from "react";

// export default styled(({...other}) => <Tabs {...other} />)`
//   color: #002398;
//   & .MuiTabs-indicator {
//     background-color: #002398;
//   }
//    & .Mui-selected {
//     font-weight: bold;
//   }
// `;


export default styled(Tabs)`
  color: #002398;
  & .MuiTabs-indicator {
    background-color: #002398;
  }
   & .Mui-selected {
    font-weight: bold;
  }
`;
