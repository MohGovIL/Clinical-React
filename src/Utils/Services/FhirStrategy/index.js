/*import React, { useState } from 'react';
import Appointment from "./Appointment";
import Encounter from "./Encounter";
import HealthcareService from "./HealthcareService";
import Organization from "./Organization";
import Patient from "./Patient";
import ValueSet from "./ValueSet";

// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FhirStrategy.setStrategy(with the object you want);  .
// 3) Call doWork from the FhirStrategy .


export class FhirStrategy  {

    constructor(obj){
        this.strategy = obj;
    };

    setStrategy(obj){
        this.strategy = obj;
    };

    doWork(params){
        let strategy = this.strategy;
        return strategy.doWork(params)
    };


}*/

import React, { useState } from 'react';
import Appointment from "./Appointment";
import Encounter from "./Encounter";
import HealthcareService from "./HealthcareService";
import Organization from "./Organization";
import Patient from "./Patient";
import ValueSet from "./ValueSet";
import {tokenInstanceGenerator} from "../AxiosWithTokenInstance";
import {ApiTokens} from "../ApiTokens";

const FhirStrategyStates = {
    Appointment: Appointment,
    Encounter: Encounter,
    HealthcareService: HealthcareService,
    Organization: Organization,
    Patient: Patient,
    ValueSet: ValueSet,
    /* More transformers */
    __default__: null
};

export const FhirStrategy = (state = null, action = null, params = null) => new Promise((resolve,reject)=>
     {


        if (action) {
            const transformer = FhirStrategyStates[state] ?? FhirStrategy.__default__;
            resolve(transformer(action, params));
        }

});
