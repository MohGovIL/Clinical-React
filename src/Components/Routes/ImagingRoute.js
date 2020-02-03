import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {baseRoutePath} from "../../Utils/Helpers/baseRoutePath";
import {useRouteMatch} from 'react-router-dom';


const ImagingRoute = (props) => {

    const {path, url} = useRouteMatch();
    return (
        <Switch>
            <Route path={`${baseRoutePath()}/imaging/`}/>
        </Switch>
    );
};

export default ImagingRoute;
