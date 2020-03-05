
import React from "react";
const TitleValueComponent = ({name,value}) => {

return(
    <React.Fragment>
        <span>{name}</span>
        <div>{value}</div>
    </React.Fragment>
);

};


export default TitleValueComponent;
