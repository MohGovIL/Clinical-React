import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const urlParams = new URLSearchParams(window.location.search);
const envMode = urlParams.get('mode');
var iframePath;
if (typeof envMode !== "undefined" && envMode == 'dev') {
    const basePath = urlParams.get('path');
    iframePath = `http://localhost${basePath}/../openemr/interface`;
} else {
    iframePath = 'https://www.hugofranca.com/404';
}

ReactDOM.render(<App appUrl={iframePath}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
