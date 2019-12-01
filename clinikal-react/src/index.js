import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


var iframePath = '../../../interface';

ReactDOM.render(<Suspense fallback="loading..."><App appUrl={iframePath}/></Suspense>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
