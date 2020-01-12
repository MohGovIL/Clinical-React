import React from 'react';
import Imaging from "../Imaging/Imaging";

const VerticalRoute = ({clinikal_vertical}) => {

  switch (clinikal_vertical) {
      case "imaging":
          return <Imaging clinikal_vertical={clinikal_vertical}/>;
      default:
          return <h1>Error</h1>
  }
};

export default VerticalRoute;
