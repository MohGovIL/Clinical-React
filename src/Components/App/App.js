import React from 'react';
import classes from './App.css';
import Header from "../../Header";
import IframeEnvelopPatientFile from "../../IframeEnvelopPatientFile";
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../Login/Login';
import GetData from '../GetData/GetData';
// import i18n (needs to be bundled ;))
import {xl} from '../../i18n';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path='/facility' component={GetData} />
                <Redirect from="" to="/"/>
            </Switch>
        </BrowserRouter>
    )
};

export default App;
