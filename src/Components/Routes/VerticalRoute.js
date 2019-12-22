import React from 'react';
import Imaging from "../Imaging/Imaging";
import Loader from "../../Assets/Elements/Loader/Loader";

const VerticalRoute = ({verticalName}) => {

  switch (verticalName) {
      case "imaging":
          return <Imaging/>;
      default:
          return <h1>Error</h1>
  }
};

export default VerticalRoute;
