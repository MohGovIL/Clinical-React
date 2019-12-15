import React from 'react';
import classes from './App.css';
import Header from "../../Header";
import IframeEnvelopPatientFile from "../../IframeEnvelopPatientFile";
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../Login/Login';
import GetData from '../GetData/GetData';
import PrivateRoute from "../PrivateRoute/PrivateRoute";

// import i18n (needs to be bundled ;))
import {xl} from '../../i18n';
import Routes from "../Routes/Routes";

const App = () => {
    return (
        <Routes/>
    )
};

export default App;
