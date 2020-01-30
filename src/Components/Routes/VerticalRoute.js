import React from 'react';
import Imaging from "../Imaging/Imaging";
import {Route, Switch} from 'react-router-dom';
import {baseRoutePath} from "../../Utils/Helpers/baseRoutePath";

const VerticalRoute = () => {

return(
    <React.Fragment>
        <Switch>
            <Route exact path={`${baseRoutePath()}/imaging`} component={Imaging}/>
        </Switch>
    </React.Fragment>
);
};

export default VerticalRoute;
