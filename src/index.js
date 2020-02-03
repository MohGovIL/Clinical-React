import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import loginReducer from './Store/Reducers/LoginReducer';
import facilityReducer from './Store/Reducers/FacilityReducer';
import SettingsReducer from "./Store/Reducers/SettingsReducer";
import PatientTrackingReducer from "./Store/Reducers/PatientTrackingReducer";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    login: loginReducer,
    facilityData: facilityReducer,
    settings: SettingsReducer,
    patientTracking: PatientTrackingReducer,
});
//Added export so I can use it in story book hopefully
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// ReactDOM.render(<Provider Store={Store}><Suspense fallback="loading..."><App appUrl={iframePath}/></Suspense></Provider>, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
