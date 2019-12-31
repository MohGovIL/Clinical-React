import React from 'react';
import Imaging from "../Imaging/Imaging";

const VerticalRoute = ({verticalName}) => {

  switch (verticalName) {
      case "imaging":
          return <Imaging/>;
      default:
          return <h1>Error</h1>
  }
};

export default VerticalRoute;
