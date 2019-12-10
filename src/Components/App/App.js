import React from 'react';
import classes from './App.css';
import Header from "../../Header";
import IframeEnvelopPatientFile from "../../IframeEnvelopPatientFile";
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../Login/Login';
// import i18n (needs to be bundled ;))
import {xl} from '../../i18n';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login}/>
        </BrowserRouter>
    )
}

export default App;
