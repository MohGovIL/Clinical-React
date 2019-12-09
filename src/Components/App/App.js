import React from 'react';
import styles from './App.css';
import Header from "../../Header";
import IframeEnvelopPatientFile from "../../IframeEnvelopPatientFile";
import Login from '../Login/Login';
// import i18n (needs to be bundled ;))
import {xl} from '../../i18n';

const App = () => {
    return (
        <Login/>
    )
}

export default App;
